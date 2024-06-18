import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postID')
  commentPost(
    @Param('postID') postID: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.commentPost(postID, createCommentDto);
  }

  @Get(':postID')
  getCommentsFromPost(@Param('postID') postID: string) {
    return this.commentsService.getCommentsFromPost(postID);
  }

  @Patch(':commentID')
  updateComment(
    @Param('commentID') commentID: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentID, updateCommentDto);
  }

  @Delete(':commentID')
  deleteComment(@Param('commentID') commentID: string) {
    return this.commentsService.deleteComment(commentID);
  }
}
