import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postsService.createPost(createPostDto, req.user);
  }

  @Get()
  searchPost(@Query('content') content?: string) {
    return this.postsService.searchPost();
  }

  @Get(':postID')
  getPostByID(@Param('postID') postID: string) {
    return this.postsService.getPostByID(postID);
  }

  @Get(':userID')
  getPostByUserID(@Param('userID') userID: string) {
    return this.postsService.getPostByUserID(userID);
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
