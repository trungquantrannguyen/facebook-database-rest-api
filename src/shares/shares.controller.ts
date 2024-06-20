import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
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
    @Request() req: any,
  ) {
    return this.sharesService.sharePost(postID, createShareDto, req.user);
  }

  @Get(':postID')
  getSharesFromPost(@Param('postID') postID: string) {
    return this.sharesService.getSharesFromPost(postID);
  }

  @Patch(':shareID')
  updateShare(
    @Param('shareID') shareID: string,
    @Body() updateShareDto: UpdateShareDto,
    @Request() req: any,
  ) {
    return this.sharesService.updateShare(shareID, updateShareDto, req.user);
  }

  @Delete(':shareID')
  deleteShare(@Param('shareID') shareID: string, @Request() req: any) {
    return this.sharesService.deleteShare(shareID, req.user);
  }
}
