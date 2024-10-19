import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Blog } from "./blog.model";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Injectable()
export class BlogsService {
    constructor (
        @InjectModel(Blog)
        private blogModel: typeof Blog,
    ) {}

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = new Blog();
        blog.userId = createBlogDto.userId;
        blog.title = createBlogDto.title;
        blog.description = createBlogDto.description;
        return blog.save();
    }

    async findAll(): Promise<Blog[]> {
        return this.blogModel.findAll({ include: ['user', 'posts'] });
    }

    async findOne(id: number): Promise<Blog> {
        const blog = this.blogModel.findByPk(id, { include: ['user', 'posts'] });
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        return blog;
    }

    async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const blog = await this.findOne(id);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        return blog.update(updateBlogDto);
    }

    async remove(id: number): Promise<void> {
        const blog = await this.findOne(id);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        await blog.destroy();
    }
}
