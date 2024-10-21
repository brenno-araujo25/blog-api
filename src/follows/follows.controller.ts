import {
    Controller,
    Post,
    Get,
    UseGuards,
    Param,
    Body,
    Request,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('follows')
export class FollowsController {
    constructor(private readonly followsService: FollowsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async toggleFollow(
        @Body() createFollowDto: CreateFollowDto,
        @Request() req,
    ) {
        const follow = await this.followsService.follow(
            req.user.id,
            createFollowDto.followingId,
        );
        if (follow) {
            return { message: 'User followed' };
        } else {
            return { message: 'User unfollowed' };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('followers/:userId')
    async getFollowers(@Param('userId') userId: number) {
        const followers = await this.followsService.findFollowers(userId);
        return followers.map((follow) => follow.follower);
    }

    @UseGuards(JwtAuthGuard)
    @Get('following/:userId')
    async getFollowing(@Param('userId') userId: number) {
        const following = await this.followsService.findFollowing(userId);
        return following.map((follow) => follow.following);
    }
}
