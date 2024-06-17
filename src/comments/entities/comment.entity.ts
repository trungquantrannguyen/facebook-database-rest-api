import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Table,
  Model,
  IsDate,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
@Table
export class Comment extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  commentID: any;

  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  postID: any;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userID: any;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column
  content: string;

  @IsDate
  @CreatedAt
  @Column
  created_at: Date;

  @IsDate
  @UpdatedAt
  @Column
  updated_at: Date;
}
