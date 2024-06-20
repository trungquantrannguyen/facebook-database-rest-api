import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Share } from './entities/share.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class SharesService {
  constructor(
    @InjectModel(Share) private readonly shareModel: typeof Share,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  async getShareCountFromPost(postID: string) {
    return (await this.shareModel.findAndCountAll({ where: { postID } })).count;
  }

  sharePost(postID: string, createShareDto: CreateShareDto, user: any) {
    if (!createShareDto.content) {
      return this.shareModel.create({
        postID: postID,
        userID: user.userID,
      });
    }
    return this.shareModel.create({
      content: createShareDto.content,
      postID: postID,
      userID: user.userID,
    });
  }
  getSharesFromPost(postID: string) {
    const post = this.postsService.getPostByID(postID);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.shareModel.findAll({ where: { postID } });
  }
  async updateShare(
    shareID: string,
    updateShareDto: UpdateShareDto,
    user: any,
  ) {
    const share = await this.shareModel.findByPk(shareID);

    if (!share) {
      throw new NotFoundException('Share not found');
    }
    if (share.userID !== user.userID) {
      throw new UnauthorizedException('You can only update your share');
    }

    return await this.shareModel.update(
      { ...updateShareDto },
      { where: { shareID }, returning: true },
    );
  }
  async deleteShare(shareID: string, user: any) {
    const share = await this.shareModel.findByPk(shareID);

    if (!share) {
      throw new NotFoundException('Share not found');
    }
    if (share.userID !== user.userID) {
      throw new UnauthorizedException('You can only delete your share');
    }

    return await this.shareModel.destroy({ where: { shareID } });
  }
}
