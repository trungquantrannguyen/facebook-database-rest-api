import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Injectable()
export class ReactionsService {
  reactPost(reactionID: string, createReactionDto: CreateReactionDto) {
    throw new Error('Method not implemented.');
  }
  getReactionsFromPost(reactionID: string) {
    throw new Error('Method not implemented.');
  }
  updateReaction(reactionID: string, updateReactionDto: UpdateReactionDto) {
    throw new Error('Method not implemented.');
  }
  deleteReaction(reactionID: string) {
    throw new Error('Method not implemented.');
  }
}
