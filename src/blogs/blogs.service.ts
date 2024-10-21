import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
    constructor(
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
        const blogs = await this.blogModel.findAll({
            include: ['user', 'posts'],
        });
        const newBlogs = blogs.map((blog) => {
            const newBlog = blog.toJSON();
            if (newBlog.user) {
                delete newBlog.user.password;
            }
            return newBlog;
        });
        return newBlogs;
    }

    async findOne(id: number): Promise<Blog> {
        const blog = await this.blogModel.findByPk(id, {
            include: ['user', 'posts'],
        });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        // exclude user password from the response
        const newBlog = blog.toJSON();
        if (newBlog.user) delete newBlog.user.password;

        return newBlog;
    }

    async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const blog = await this.blogModel.findByPk(id);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        return blog.update(updateBlogDto);
    }

    async remove(id: number): Promise<void> {
        const blog = await this.blogModel.findByPk(id);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }
        await blog.destroy();
    }
}
