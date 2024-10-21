import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './like.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Like)
        private likeModel: typeof Like,
        private postsService: PostsService,
        private usersService: UsersService,
    ) {}

    async toggleLike(createLikeDto: CreateLikeDto): Promise<Like> {
        const post = await this.postsService.findOne(createLikeDto.postId);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        const user = await this.usersService.findOne(createLikeDto.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        let like = await this.likeModel.findOne({
            where: {
                postId: createLikeDto.postId,
                userId: createLikeDto.userId,
            },
        });
        if (like) {
            await like.destroy();
            return null;
        } else {
            like = new Like();
            like.postId = createLikeDto.postId;
            like.userId = createLikeDto.userId;
            return like.save();
        }
    }

    async countLikes(postId: number): Promise<number> {
        return this.likeModel.count({ where: { postId } });
    }
}
