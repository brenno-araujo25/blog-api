import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Post } from '../posts/post.model';
import { User } from '../users/user.model';

@Table
export class Like extends Model<Like> {
    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}