import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Follow extends Model<Follow> {
  @ForeignKey(() => User)
  @Column
  followerId: number;

  @BelongsTo(() => User, 'followerId')
  follower: User;

  @ForeignKey(() => User)
  @Column
  followingId: number;

  @BelongsTo(() => User, 'followingId')
  following: User;
}