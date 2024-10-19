import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './post.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
        return this.postsService.create(createPostDto);
    }

    //@UseInterceptors(CacheInterceptor)
    @Get()
    async findAll(): Promise<PostModel[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostModel> {
        return this.postsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updatePostDto: UpdatePostDto,
        @Request() req,
    ): Promise<PostModel> {
        const post = await this.postsService.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        if (post.userId !== req.user.id) {
            throw new UnauthorizedException('You are not authorized to update this post');
        }
        return this.postsService.update(id, updatePostDto);
    }
}