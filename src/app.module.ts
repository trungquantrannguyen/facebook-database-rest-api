import { Module, ParseIntPipe } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './core/database/database.module';
import * as dotenv from 'dotenv';

dotenv.config();
// const databaseConfig = {
//   dialect: process.env.DATABASE_DIALECT,
//   host: process.env.DATABASE_HOST,
//   port: parseInt(process.env.DATABASE_PORT),
//   username: process.env.DATABASE_DIALECT,
//   password: process.env.DATABASE_DIALECT,
//   database: process.env.DATABASE_DIALECT,
//   autoLoadModels: true,
//   synchronize: true,
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
