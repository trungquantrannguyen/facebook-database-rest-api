import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Friendship } from './entities/friendship.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class FriendshipsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @InjectModel(Friendship)
    private readonly friendshipModel: typeof Friendship,
  ) {}

  async addFriendship(friendshipID: string, user: any): Promise<Friendship> {
    // console.log(user);
    const friendUser = this.usersService.GetUserByID(friendshipID);

    if (!friendUser) {
      throw new NotFoundException('User not found');
    }

    const newFriendship = await this.friendshipModel.create({
      user1ID: user.userID,
      user2ID: friendshipID,
    });

    return newFriendship;
  }
  async searchFriendship(user: any, status: string) {
    if (status) {
      return await this.friendshipModel.findAll({
        where: { user1ID: user.userID, status: status },
        order: [['created_at', 'DESC']],
        limit: 10,
      });
    }
    return await this.friendshipModel.findAll({
      where: { user1ID: user.userID },
      order: [['created_at', 'DESC']],
      limit: 10,
    });
  }

  async getPendingFriendRequest(user: any) {
    return await this.friendshipModel.findAll({
      where: { user2ID: user.userID, status: 'pending' },
      order: [['created_at', 'DESC']],
      limit: 10,
    });
  }
  async acceptFriendship(friendshipID: string, user: any) {
    const friendRequest = await this.friendshipModel.findOne({
      where: { friendshipID, user2ID: user.userID },
    });
    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }
    const [affectedRow, acceptedFriendRequest] =
      await this.friendshipModel.update(
        {
          status: 'accepted',
        },
        { where: { friendshipID, user2ID: user.userID }, returning: true },
      );
    const acceptedFriendRequestData = acceptedFriendRequest[0].dataValues;
    const friendship = await this.friendshipModel.create({
      user1ID: acceptedFriendRequestData.user2ID,
      user2ID: acceptedFriendRequestData.user1ID,
      status: 'accepted',
    });

    return { acceptedFriendRequestData, friendship };
  }

  async rejectFriendship(friendshipID: string, user: any) {
    const friendRequest = await this.friendshipModel.findOne({
      where: { friendshipID, user2ID: user.userID },
    });
    if (!friendRequest) {
      throw new NotFoundException('Friend request not found');
    }
    const [affectedRow, rejectedFriendRequest] =
      await this.friendshipModel.update(
        {
          status: 'rejected',
        },
        { where: { friendshipID, user2ID: user.userID }, returning: true },
      );
    const rejectedFriendRequestData = rejectedFriendRequest[0].dataValues;
    return rejectedFriendRequestData;
  }
  async deleteFriendship(friendshipID: string, user: any) {
    const yourFriendship = await this.friendshipModel.findOne({
      where: { friendshipID, user1ID: user.userID },
    });

    // console.log(yourFriendship);
    if (!yourFriendship) {
      throw new NotFoundException('Friendship not found');
    }
    // const yourFriendshipData = yourFriendship.dataValues;
    // console.log(yourFriendshipData);

    const theirFriendship = await this.friendshipModel.findOne({
      where: {
        user1ID: yourFriendship.dataValues.user2ID,
        user2ID: yourFriendship.dataValues.user1ID,
      },
    });

    if (theirFriendship) {
      const theirFriendshipID = theirFriendship.dataValues.friendshipID;
      const theirUserID = theirFriendship.dataValues.user1ID;
      return await this.friendshipModel.destroy({
        where: {
          [Op.or]: [
            { friendshipID: friendshipID, user1ID: user.userID },
            { friendshipID: theirFriendshipID, user1ID: theirUserID },
          ],
        },
      });
    }
    return await this.friendshipModel.destroy({
      where: { friendshipID: friendshipID, user1ID: user.userID },
    });
  }
}
