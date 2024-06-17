import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  IsDate,
  Model,
  PrimaryKey,
  IsUUID,
  Table,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Share } from 'src/shares/entities/share.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Post extends Model {
  @AllowNull(false)
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  postID: any;

  @IsDate
  @CreatedAt
  @Column
  created_at: Date;

  @IsDate
  @UpdatedAt
  @Column
  updated_at: Date;

  @Column
  content: string;

  @Column
  image: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userID: any;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Share)
  shares: Share[];
}
