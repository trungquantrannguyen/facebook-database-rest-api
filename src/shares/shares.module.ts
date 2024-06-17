import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Share } from './entities/share.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [SharesController],
  providers: [SharesService],
  imports: [SequelizeModule.forFeature([Share]), UsersModule, PostsModule],
  exports: [SequelizeModule],
})
export class SharesModule {}
