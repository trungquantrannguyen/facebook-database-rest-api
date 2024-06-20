import { Module, forwardRef } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reaction } from './entities/reaction.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService],
  imports: [
    SequelizeModule.forFeature([Reaction]),
    forwardRef(() => PostsModule),
  ],
  exports: [SequelizeModule, ReactionsService],
})
export class ReactionsModule {}
