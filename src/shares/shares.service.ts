import { Injectable } from '@nestjs/common';
import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';

@Injectable()
export class SharesService {
  sharePost(postID: string, createShareDto: CreateShareDto) {
    throw new Error('Method not implemented.');
  }
  GetSharesFromPost(postID: string) {
    throw new Error('Method not implemented.');
  }
  updateShare(shareID: string, updateShareDto: UpdateShareDto) {
    throw new Error('Method not implemented.');
  }
  deleteShare(shareID: string) {
    throw new Error('Method not implemented.');
  }
}
