import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './like.model';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [SequelizeModule.forFeature([Like]), PostsModule, UsersModule],
    providers: [LikesService],
    controllers: [LikesController],
    exports: [LikesService],
})
export class LikesModule {}
