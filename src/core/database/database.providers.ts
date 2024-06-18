// import { Sequelize } from 'sequelize-typescript';
// import { databaseConfig } from './database.config';
// import { User } from 'src/users/entities/user.entity';
// import { Post } from 'src/posts/entities/post.entity';
// import { Friendship } from 'src/friendships/entities/friendship.entity';
// import { Reaction } from 'src/reactions/entities/reaction.entity';
// import { Comment } from 'src/comments/entities/comment.entity';
// import { Share } from 'src/shares/entities/share.entity';

// export const databaseProviders = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async () => {
//       let config = databaseConfig.development;
//       const sequelize = new Sequelize(config);
//       sequelize.addModels([User, Post, Friendship, Reaction, Comment, Share]);
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ];
