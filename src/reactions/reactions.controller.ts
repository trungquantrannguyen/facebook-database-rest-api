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
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post(':postID')
  reactPost(
    @Param('postID') postID: string,
    @Body() createReactionDto: CreateReactionDto,
    @Request() req: any,
  ) {
    return this.reactionsService.reactPost(postID, createReactionDto, req.user);
  }

  @Get(':postID')
  getReactionsFromPost(@Param('postID') postID: string) {
    return this.reactionsService.getReactionsFromPost(postID);
  }

  @Delete(':reactionID')
  deleteReaction(@Param('reactionID') reactionID: string, @Request() req: any) {
    return this.reactionsService.deleteReaction(reactionID, req.user);
  }
}
