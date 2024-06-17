import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  IsDate,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Like extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  likeID: any;

  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  postID: any;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  UserID: any;

  @BelongsTo(() => User)
  user: User;

  @IsDate
  @CreatedAt
  @Column
  created_at: Date;

  @IsDate
  @UpdatedAt
  @Column
  updated_at: Date;
}
