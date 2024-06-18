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
import { FriendshipsService } from './friendships.service';

@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post(':friendshipID')
  addFriendship(@Param('friendshipID') friendshipID: string) {
    return this.friendshipsService.addFriendship(friendshipID);
  }

  @Get(':friendshipID')
  searchFriendship(
    @Param('friendshipID') friendshipID: string,
    @Query('status') status?: 'accepted' | 'pending' | 'rejected',
  ) {
    return this.friendshipsService.searchFriendship(friendshipID, status);
  }

  @Patch('accept/:friendshipID')
  acceptFriendship(@Param('friendshipID') friendshipID: string) {
    return this.friendshipsService.acceptFriendship(friendshipID);
  }

  @Patch('reject/:friendshipID')
  rejectFriendship(@Param('friendshipID') friendshipID: string) {
    return this.friendshipsService.rejectFriendship(friendshipID);
  }

  @Delete(':friendshipID')
  deleteFriendship(@Param('friendshipID') friendshipID: string) {
    return this.friendshipsService.deleteFriendship(friendshipID);
  }
}
