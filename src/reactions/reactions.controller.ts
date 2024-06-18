import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post(':postID')
  reactPost(
    @Param('postID') postID: string,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.reactionsService.reactPost(postID, createReactionDto);
  }

  @Get(':postID')
  getReactionsFromPost(@Param('postID') postID: string) {
    return this.reactionsService.getReactionsFromPost(postID);
  }

  @Patch(':reactionID')
  updateReaction(
    @Param('reactionID') reactionID: string,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.updateReaction(reactionID, updateReactionDto);
  }

  @Delete(':reactionID')
  deleteReaction(@Param('reactionID') reactionID: string) {
    return this.reactionsService.deleteReaction(reactionID);
  }
}
