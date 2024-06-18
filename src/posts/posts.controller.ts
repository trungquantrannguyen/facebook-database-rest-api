import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  searchPost(@Query('content') content?: string) {
    return this.postsService.searchPost();
  }

  @Get(':postID')
  getPostByID(@Param('postID') postID: string) {
    return this.postsService.getPostByID(postID);
  }

  @Patch(':postID')
  updatePost(
    @Param('postID') postID: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(postID, updatePostDto);
  }

  @Delete(':postID')
  deletePost(@Param('postID') postID: string) {
    return this.postsService.deletePost(postID);
  }
}
