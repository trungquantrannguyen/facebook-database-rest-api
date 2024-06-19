import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reaction } from './entities/reaction.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly postService: PostsService,
    @InjectModel(Reaction) private readonly reactionModel: typeof Reaction,
  ) {}
  async reactPost(
    postID: string,
    createReactionDto: CreateReactionDto,
    user: any,
  ) {
    const post = await this.postService.getPostByID(postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingReaction = await this.reactionModel.findOne({
      where: { userID: user.userID },
    });

    if (existingReaction) {
      if (existingReaction.reaction !== createReactionDto.reaction) {
        return await this.reactionModel.update(
          { reaction: createReactionDto.reaction },
          { where: { userID: user.userID } },
        );
      } else {
        return existingReaction;
      }
    }

    return await this.reactionModel.create({
      reaction: createReactionDto.reaction,
      postID: postID,
      userID: user.userID,
    });
  }

  async getReactionsFromPost(postID: string) {
    const post = await this.postService.getPostByID(postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.reactionModel.findAll({
      where: { postID: postID },
    });
  }

  async deleteReaction(reactionID: string, user: any) {
    const reaction = await this.reactionModel.findByPk(reactionID);
    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    const reactionData = reaction.dataValues;

    if (reactionData.userID !== user.userID) {
      throw new UnauthorizedException('You can only delete your reaction');
    }

    const post = await this.postService.getPostByID(reactionData.postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.reactionModel.destroy({ where: { reactionID } });
  }
}
