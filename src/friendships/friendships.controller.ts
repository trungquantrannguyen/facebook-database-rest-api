import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post(':friendshipID')
  addFriendship(
    @Param('friendshipID') friendshipID: string,
    @Request() req: any,
  ) {
    return this.friendshipsService.addFriendship(friendshipID, req.user);
  }

  @Get()
  searchFriendship(
    @Request() req: any,
    @Query('status') status?: 'accepted' | 'pending' | 'rejected',
  ) {
    return this.friendshipsService.searchFriendship(req.user, status);
  }

  @Get('pending')
  getPendingFriendRequest(@Request() req: any) {
    return this.friendshipsService.getPendingFriendRequest(req.user);
  }

  @Patch('accept/:friendshipID')
  acceptFriendship(
    @Param('friendshipID') friendshipID: string,
    @Request() req: any,
  ) {
    return this.friendshipsService.acceptFriendship(friendshipID, req.user);
  }

  @Patch('reject/:friendshipID')
  rejectFriendship(
    @Param('friendshipID') friendshipID: string,
    @Request() req: any,
  ) {
    return this.friendshipsService.rejectFriendship(friendshipID, req.user);
  }

  @Delete(':friendshipID')
  deleteFriendship(
    @Param('friendshipID') friendshipID: string,
    @Request() req: any,
  ) {
    return this.friendshipsService.deleteFriendship(friendshipID, req.user);
  }
}
