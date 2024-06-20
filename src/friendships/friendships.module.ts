import { Module, forwardRef } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friendship } from './entities/friendship.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService],
  imports: [
    SequelizeModule.forFeature([Friendship]),
    forwardRef(() => UsersModule),
  ],
  exports: [FriendshipsService, SequelizeModule],
})
export class FriendshipsModule {}
