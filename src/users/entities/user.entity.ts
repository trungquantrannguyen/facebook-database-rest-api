import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  IsUUID,
  PrimaryKey,
  IsEmail,
  IsDate,
  AllowNull,
  HasMany,
  Default,
  DataType,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/entities/comment.entity';
import { Friendship } from 'src/friendships/entities/friendship.entity';
import { Reaction } from './../../reactions/entities/reaction.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Share } from 'src/shares/entities/share.entity';

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  userID: any;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  fullname: string;

  @Column
  bio: string;

  @IsDate
  @CreatedAt
  @Column
  created_at: Date;

  @IsDate
  @UpdatedAt
  @Column
  updated_at: Date;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Reaction)
  likes: Reaction[];

  @HasMany(() => Share)
  shares: Share[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Friendship)
  friendship1s: Friendship[];

  @HasMany(() => Friendship)
  friendship2s: Friendship[];
}
