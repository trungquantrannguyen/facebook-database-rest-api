import {
  AllowNull,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  IsDate,
  IsIn,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Friendship extends Model {
  @AllowNull(false)
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  friendshipID: any;

  @IsIn([['pending', 'accepted', 'rejected']])
  @Default('pending')
  @Column
  status: string;

  @IsDate
  @CreatedAt
  @Column
  created_at: Date;

  @IsDate
  @UpdatedAt
  @Column
  updated_at: Date;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user1ID: any;

  @BelongsTo(() => User, 'user1ID')
  user1: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user2ID: any;

  @BelongsTo(() => User, 'user2ID')
  user2: User;
}
