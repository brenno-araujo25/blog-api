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
import { Post } from '../posts/post.model';

@Table
export class Blog extends Model<Blog> {
    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Post)
    posts: Post[];
}
