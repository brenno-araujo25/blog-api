import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { BlogsModule } from 'src/blogs/blogs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Post]),
        BlogsModule,
        UsersModule
    ],
    providers: [PostsService],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {}