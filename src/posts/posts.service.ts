import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./post.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { BlogsService } from "src/blogs/blogs.service";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post)
        private postModel: typeof Post,
        private blogsService: BlogsService,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const blog = await this.blogsService.findOne(createPostDto.blogId);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        const post = new Post();
        post.title = createPostDto.title;
        post.content = createPostDto.content;
        post.blogId = createPostDto.blogId;
        post.userId = createPostDto.userId;
        return post.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.findAll({ include: ['blog', 'user', 'comments', 'likes'] });
    }

    async findOne(id: number): Promise<Post> {
        const post = this.postModel.findByPk(id, { include: ['blog', 'user', 'comments', 'likes'] });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async update(id: number, updateBlogDto: UpdatePostDto): Promise<Post> {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post.update(updateBlogDto);
    }

    async remove(id: number): Promise<void> {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        await post.destroy();
    }
}