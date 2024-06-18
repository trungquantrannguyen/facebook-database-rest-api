import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { CommentsModule } from './comments/comments.module';
import { SharesModule } from './shares/shares.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReactionsModule } from './reactions/reactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'facebook',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    FriendshipsModule,
    CommentsModule,
    SharesModule,
    ReactionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
