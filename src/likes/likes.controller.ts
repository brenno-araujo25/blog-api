import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async toggleLike(@Body() createLikeDto: CreateLikeDto, @Request() req) {
        createLikeDto.userId = req.user.id;
        const like = await this.likesService.toggleLike(createLikeDto);
        if (like) {
            return { message: 'Like added' };
        } else {
            return { message: 'Like removed' };
        }
    }

    @Get('count/:postId')
    async countLikes(@Param('postId') postId: number) {
        const count = await this.likesService.countLikes(postId);
        return { count };
    }
}
