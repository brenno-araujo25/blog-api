import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createCommentDto: CreateCommentDto,
        @Request() req
    ): Promise<Comment> {
        createCommentDto.userId = req.user.id;
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateCommentDto: UpdateCommentDto,
        @Request() req,
    ): Promise<Comment> {
        const comment = await this.commentsService.findOne(id);
        if (comment.userId !== req.user.id) {
            throw new UnauthorizedException('You cannot update this comment');
        }
        return this.commentsService.update(id, updateCommentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(
        @Param('id') id: number,
        @Request() req
    ): Promise<void> {
        const comment = await this.commentsService.findOne(id);
        if (comment.userId !== req.user.id) {
            throw new UnauthorizedException('You cannot delete this comment');
        }
        return this.commentsService.remove(id);
    }
}