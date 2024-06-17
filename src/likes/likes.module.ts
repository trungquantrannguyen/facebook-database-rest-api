import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './entities/like.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [SequelizeModule.forFeature([Like]), UsersModule, PostsModule],
  exports: [SequelizeModule],
})
export class LikesModule {}
