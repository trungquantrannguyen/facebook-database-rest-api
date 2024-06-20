import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { Op } from 'sequelize';
import { ReactionsService } from 'src/reactions/reactions.service';
import { CommentsService } from 'src/comments/comments.service';
import { SharesService } from 'src/shares/shares.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
    @Inject(forwardRef(() => ReactionsService))
    private readonly reactionsService: ReactionsService,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
    @Inject(forwardRef(() => SharesService))
    private readonly sharesService: SharesService,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: any): Promise<Post> {
    return await this.postModel.create({
      content: createPostDto.content,
      image: createPostDto.image,
      userID: user.userID,
    });
  }

  async getPostDataCount(postID: string) {
    const reactionCount =
      await this.reactionsService.getReactionCountFromPost(postID);
    const commentCount =
      await this.commentsService.getCommentCountFromPost(postID);
    const shareCount = await this.sharesService.getShareCountFromPost(postID);

    return { reactionCount, commentCount, shareCount };
  }
  async searchPost(content: string) {
    let resultPost = [];
    if (content) {
      const posts = await this.postModel.findAll({
        where: { content: { [Op.regexp]: content } },
        order: [['created_at', 'ASC']],
        limit: 10,
      });
      for (let post of posts) {
        let i = 0;
        const postDataCount = await this.getPostDataCount(post.postID);
        resultPost[i] = { post, ...postDataCount };
        i++;
      }
      return resultPost;
    }
    const posts = await this.postModel.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
    });
    for (let post of posts) {
      let i = 0;
      const postDataCount = await this.getPostDataCount(post.postID);
      resultPost[i] = { ...post.dataValues, ...postDataCount };
      i++;
    }
    return resultPost;
  }

  async getPostByID(postID: string) {
    const post = await this.postModel.findByPk(postID);
    const postDataCount = await this.getPostDataCount(post.postID);
    return { post, postDataCount };
  }

  async getPostsByUserID(userID: string) {
    let resultPost;
    const posts = await this.postModel.findAll({
      where: { userID },
      order: [['created_at', 'DESC']],
    });
    for (let post of posts) {
      let i = 0;
      const postDataCount = await this.getPostDataCount(post.postID);
      resultPost[i] = { ...post.dataValues, ...postDataCount };
      i++;
    }
    return resultPost;
  }

  async updatePost(postID: string, updatePostDto: UpdatePostDto, user: any) {
    let resultPost;
    const post = await this.getPostByID(postID);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user.userID !== post.post.userID) {
      throw new UnauthorizedException('You can only update your post');
    }
    const [affectedRows, posts] = await this.postModel.update(
      { ...updatePostDto },
      { where: { postID }, returning: true },
    );
    for (let post of posts) {
      let i = 0;
      const postDataCount = await this.getPostDataCount(post.postID);
      resultPost[i] = { ...post.dataValues, ...postDataCount };
      i++;
    }
    return resultPost;
  }

  async deletePost(postID: string, user: any): Promise<any> {
    const post = await this.getPostByID(postID);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user.userID !== post.post.userID) {
      throw new UnauthorizedException('You can only delete your post');
    }
    return await this.postModel.destroy({ where: { postID } });
  }
}
