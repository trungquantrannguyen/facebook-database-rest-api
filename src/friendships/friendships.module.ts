import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friendship } from './entities/friendship.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService],
  imports: [UsersModule, SequelizeModule.forFeature([Friendship])],
  exports: [SequelizeModule],
})
export class FriendshipsModule {}
