import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PostsService } from "../posts/posts.service";

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment)
        private commentModel: typeof Comment,
        private postsService: PostsService
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const post = await this.postsService.findOne(createCommentDto.postId);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const comment = new Comment();
        comment.postId = createCommentDto.postId;
        comment.content = createCommentDto.content;
        comment.userId = createCommentDto.userId;
        return comment.save();
    }

    async findAll(): Promise<Comment[]> {
        return this.commentModel.findAll({ include: ['post', 'user'] });
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.commentModel.findByPk(id, { include: ['post', 'user'] });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment.update(updateCommentDto);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        await comment.destroy();
    }
}