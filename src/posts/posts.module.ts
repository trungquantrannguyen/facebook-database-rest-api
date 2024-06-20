import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { ReactionsService } from 'src/reactions/reactions.service';
import { CommentsService } from 'src/comments/comments.service';
import { SharesService } from 'src/shares/shares.service';
import { ReactionsModule } from 'src/reactions/reactions.module';
import { CommentsModule } from 'src/comments/comments.module';
import { SharesModule } from 'src/shares/shares.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Post]),
    UsersModule,
    forwardRef(() => ReactionsModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => SharesModule),
  ],
  exports: [PostsService, SequelizeModule],
})
export class PostsModule {}
