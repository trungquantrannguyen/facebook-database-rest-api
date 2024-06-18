import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  commentPost(commentID: string, createCommentDto: CreateCommentDto) {
    throw new Error('Method not implemented.');
  }
  getCommentsFromPost(commentID: string) {
    throw new Error('Method not implemented.');
  }
  updateComment(commentID: string, updateCommentDto: UpdateCommentDto) {
    throw new Error('Method not implemented.');
  }
  deleteComment(commentID: string) {
    throw new Error('Method not implemented.');
  }
}
