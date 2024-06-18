import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

  createPost(createPostDto: CreatePostDto) {
    return this.postModel.create({
      content: createPostDto.content,
      image: createPostDto.image,
    });
  }
  searchPost() {
    throw new Error('Method not implemented.');
  }
  getPostByID(postID: string) {
    throw new Error('Method not implemented.');
  }
  getPostByUserID(postID: string) {}
  updatePost(postID: string, updatePostDto: UpdatePostDto) {
    throw new Error('Method not implemented.');
  }
  deletePost(postID: string) {
    throw new Error('Method not implemented.');
  }
}
