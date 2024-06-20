import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Comment]),
    forwardRef(() => PostsModule),
    UsersModule,
  ],
  exports: [SequelizeModule, CommentsService],
})
export class CommentsModule {}
