import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  createPost(createPostDto: CreatePostDto) {
    throw new Error('Method not implemented.');
  }
  searchPost() {
    throw new Error('Method not implemented.');
  }
  getPostByID(postID: string) {
    throw new Error('Method not implemented.');
  }
  updatePost(postID: string, updatePostDto: UpdatePostDto) {
    throw new Error('Method not implemented.');
  }
  deletePost(postID: string) {
    throw new Error('Method not implemented.');
  }
}
