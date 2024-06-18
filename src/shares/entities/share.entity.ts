import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  IsDate,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
@Table
export class Share extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  shareID: any;

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
