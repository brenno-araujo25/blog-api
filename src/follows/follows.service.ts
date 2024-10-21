import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follow } from './follow.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class FollowsService {
    constructor(
        @InjectModel(Follow)
        private followModel: typeof Follow,
        private usersService: UsersService,
    ) {}

    async follow(followerId: number, followingId: number): Promise<Follow> {
        const userFollowedExists = await this.usersService.findOne(followingId);
        if (!userFollowedExists) {
            throw new NotFoundException('User not found');
        }

        const existingFollowing = await this.followModel.findOne({
            where: { followerId, followingId },
        });

        if (existingFollowing) {
            await existingFollowing.destroy();
            return null;
        } else {
            const follow = new Follow();
            follow.followerId = followerId;
            follow.followingId = followingId;
            return follow.save();
        }
    }

    async findFollowers(userId: number): Promise<Follow[]> {
        const followers = await this.followModel.findAll({
            where: { followingId: userId },
            include: ['follower'],
        });
        const followersWithoutPassword = followers.map((follow) => {
            const followJson = follow.toJSON();
            delete followJson.follower.password;
            return followJson;
        });
        return followersWithoutPassword;
    }

    async findFollowing(userId: number): Promise<Follow[]> {
        const following = await this.followModel.findAll({
            where: { followerId: userId },
            include: ['following'],
        });
        const followingWithoutPassword = following.map((follow) => {
            const followingJson = follow.toJSON();
            delete followingJson.following.password;
            return followingJson;
        });
        return followingWithoutPassword;
    }
}
