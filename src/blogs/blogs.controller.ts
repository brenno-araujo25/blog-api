import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './blog.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createBlogDto: CreateBlogDto,
        @Request() req,
    ): Promise<Blog> {
        createBlogDto.userId = req.user.id;
        console.log(req.user.id);
        return this.blogsService.create(createBlogDto);
    }

    //@UseInterceptors(CacheInterceptor)
    @Get()
    async findAll(): Promise<Blog[]> {
        return this.blogsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Blog> {
        return this.blogsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateBlogDto: UpdateBlogDto,
        @Request() req,
    ): Promise<Blog> {
        const blog = await this.blogsService.findOne(id);
        if (blog.userId !== req.user.id) {
            throw new UnauthorizedException(
                'You are not authorized to update this blog',
            );
        }
        return this.blogsService.update(id, updateBlogDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req): Promise<void> {
        const blog = await this.blogsService.findOne(id);
        if (blog.userId !== req.user.id) {
            throw new UnauthorizedException(
                'You are not authorized to delete this blog',
            );
        }
        return this.blogsService.remove(id);
    }
}
