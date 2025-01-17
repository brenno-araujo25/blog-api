import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Blog } from '../blogs/blog.model';
import { Comment } from '../comments/comment.model';
import { Like } from '../likes/like.model';

@Table
export class Post extends Model<Post> {
    @Column(DataType.STRING)
    title: string;

    @Column(DataType.TEXT)
    content: string;

    @ForeignKey(() => Blog)
    @Column
    blogId: number;

    @BelongsTo(() => Blog)
    blog: Blog;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Like)
    likes: Like[];
}
