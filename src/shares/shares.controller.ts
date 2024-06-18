import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SharesService } from './shares.service';
import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';

@Controller('shares')
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @Post(':postID')
  sharePost(
    @Param('postID') postID: string,
    @Body() createShareDto: CreateShareDto,
  ) {
    return this.sharesService.sharePost(postID, createShareDto);
  }

  @Get(':postID')
  GetSharesFromPost(@Param('postID') postID: string) {
    return this.sharesService.GetSharesFromPost(postID);
  }

  @Patch(':shareID')
  updateShare(
    @Param('shareID') shareID: string,
    @Body() updateShareDto: UpdateShareDto,
  ) {
    return this.sharesService.updateShare(shareID, updateShareDto);
  }

  @Delete(':shareID')
  deleteShare(@Param('shareID') shareID: string) {
    return this.sharesService.deleteShare(shareID);
  }
}
