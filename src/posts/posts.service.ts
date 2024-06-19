import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { Op } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

  async createPost(createPostDto: CreatePostDto, user: any): Promise<Post> {
    return await this.postModel.create({
      content: createPostDto.content,
      image: createPostDto.image,
      userID: user.userID,
    });
  }
  async searchPost(content: string): Promise<Post[]> {
    if (content) {
      return await this.postModel.findAll({
        where: { content: { [Op.regexp]: content } },
        order: [['created_at', 'ASC']],
        limit: 10,
      });
    }
    return await this.postModel.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
    });
  }
  async getPostByID(postID: string): Promise<Post> {
    return await this.postModel.findByPk(postID);
  }

  getPostsByUserID(userID: string): Promise<Post[]> {
    return this.postModel.findAll({
      where: { userID },
      order: [['created_at', 'DESC']],
    });
  }

  async updatePost(
    postID: string,
    updatePostDto: UpdatePostDto,
    user: any,
  ): Promise<[number, Post[]]> {
    const post = await this.getPostByID(postID);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user.userID !== post.userID) {
      throw new UnauthorizedException('You can only update your post');
    }
    return await this.postModel.update(
      { ...updatePostDto },
      { where: { postID }, returning: true },
    );
  }
  async deletePost(postID: string, user: any): Promise<any> {
    const post = await this.getPostByID(postID);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (user.userID !== post.userID) {
      throw new UnauthorizedException('You can only delete your post');
    }
    return await this.postModel.destroy({ where: { postID } });
  }
}
