import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PostsService } from 'src/posts/posts.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(forwardRef(() => PostsService))
    private readonly postService: PostsService,
    @InjectModel(Comment) private readonly commentModel: typeof Comment,
  ) {}

  async getCommentCountFromPost(postID: string) {
    return (await this.commentModel.findAndCountAll({ where: { postID } }))
      .count;
  }

  async commentPost(
    postID: string,
    createCommentDto: CreateCommentDto,
    user: any,
  ) {
    const post = await this.postService.getPostByID(postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (!createCommentDto.content && !createCommentDto.image) {
      throw new BadRequestException('Please provide input value', {
        cause: new Error(),
        description: 'No input value',
      });
    }

    if (!createCommentDto.content) {
      return await this.commentModel.create({
        image: createCommentDto.image,
        userID: user.userID,
        postID: postID,
      });
    }
    if (!createCommentDto.image) {
      return await this.commentModel.create({
        content: createCommentDto.content,
        userID: user.userID,
        postID: postID,
      });
    }

    return await this.commentModel.create({
      content: createCommentDto.content,
      image: createCommentDto.image,
      userID: user.userID,
      postID: postID,
    });
  }
  async getCommentsFromPost(postID: string) {
    const post = await this.postService.getPostByID(postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.commentModel.findAll({
      where: { postID: postID },
    });
  }
  async updateComment(
    commentID: string,
    updateCommentDto: UpdateCommentDto,
    user: any,
  ) {
    const comment = await this.commentModel.findByPk(commentID);
    if (!comment) {
      throw new NotFoundException('Reaction not found');
    }

    const commentData = comment.dataValues;

    if (commentData.userID !== user.userID) {
      throw new UnauthorizedException('You can only delete your comment');
    }

    const post = await this.postService.getPostByID(commentData.postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.commentModel.update(
      { ...updateCommentDto },
      { where: { commentID }, returning: true },
    );
  }

  async deleteComment(commentID: string, user: any) {
    const comment = await this.commentModel.findByPk(commentID);
    if (!comment) {
      throw new NotFoundException('Reaction not found');
    }

    const commentData = comment.dataValues;

    if (commentData.userID !== user.userID) {
      throw new UnauthorizedException('You can only delete your comment');
    }

    const post = await this.postService.getPostByID(commentData.postID);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.commentModel.destroy({ where: { commentID } });
  }
}
