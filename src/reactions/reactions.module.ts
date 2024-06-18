import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reaction } from './entities/reaction.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService],
  imports: [SequelizeModule.forFeature([Reaction]), PostsModule, UsersModule],
  exports: [SequelizeModule],
})
export class ReactionsModule {}