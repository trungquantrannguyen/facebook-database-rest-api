import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postID')
  commentPost(
    @Param('postID') postID: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
  ) {
    return this.commentsService.commentPost(postID, createCommentDto, req.user);
  }

  @Get(':postID')
  getCommentsFromPost(@Param('postID') postID: string) {
    return this.commentsService.getCommentsFromPost(postID);
  }

  @Patch(':commentID')
  updateComment(
    @Param('commentID') commentID: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req: any,
  ) {
    return this.commentsService.updateComment(
      commentID,
      updateCommentDto,
      req.user,
    );
  }

  @Delete(':commentID')
  deleteComment(@Param('commentID') commentID: string, @Request() req: any) {
    return this.commentsService.deleteComment(commentID, req.user);
  }
}
