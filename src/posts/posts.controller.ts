import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    return this.postsService.createPost(createPostDto, req.user);
  }

  @Get()
  searchPost(@Query('content') content?: string) {
    return this.postsService.searchPost(content);
  }

  @Get(':postID')
  getPostByID(@Param('postID') postID: string) {
    return this.postsService.getPostByID(postID);
  }

  @Get('/user/:userID')
  getPostsByUserID(@Param('userID') userID: string) {
    return this.postsService.getPostsByUserID(userID);
  }

  @Patch(':postID')
  updatePost(
    @Param('postID') postID: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ) {
    return this.postsService.updatePost(postID, updatePostDto, req.user);
  }

  @Delete(':postID')
  deletePost(@Param('postID') postID: string, @Request() req) {
    return this.postsService.deletePost(postID, req.user);
  }
}
