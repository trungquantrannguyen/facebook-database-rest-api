import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post]), UsersModule],
  exports: [PostsService, SequelizeModule],
})
export class PostsModule {}
