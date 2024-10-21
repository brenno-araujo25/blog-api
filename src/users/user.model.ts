import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    AllowNull,
    HasMany,
} from 'sequelize-typescript';
import { Post } from '../posts/post.model';

@Table
export class User extends Model<User> {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    bio: string;

    @Column(DataType.STRING)
    avatar: string;

    // Define the relationship between the User and Post models
    @HasMany(() => Post)
    posts: Post[];
}
