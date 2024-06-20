import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { FriendshipsService } from 'src/friendships/friendships.service';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(forwardRef(() => FriendshipsService))
    private readonly friednshipsService: FriendshipsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{}> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashPassword,
      fullname: createUserDto.fullname,
      bio: createUserDto.bio,
    });

    const { pass, ...result } = newUser.dataValues;

    return { result };
  }
  async searchUser(username?: string): Promise<User[]> {
    if (username) {
      return await this.userModel.findAll({
        attributes: { exclude: ['password'] },
        where: { username: { [Op.regexp]: username } },
        order: [['created_at', 'DESC']],
        limit: 10,
      });
    }
    return await this.userModel.findAll({
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']],
      limit: 10,
    });
  }
  async GetUserByID(userID: any): Promise<any> {
    const user = await this.userModel.findByPk(userID);
    // console.log(user);
    const { password, ...result } = user.dataValues;

    return result;
  }

  async GetUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ where: { username } });
  }

  async GetUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  async updateUser(
    user: any,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    const userID = user.userID;

    const validUser = await this.userModel.findByPk(userID);
    if (validUser.userID !== userID) {
      throw new UnauthorizedException('You can only update your profile');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userModel.update(
      { ...updateUserDto },
      { where: { userID }, returning: true },
    );
  }
  async deleteUser(user: any): Promise<number> {
    const userID = user.userID;

    const validUser = await this.userModel.findByPk(userID);
    if (validUser.userID !== userID) {
      throw new UnauthorizedException('You can only update your profile');
    }

    const userFriendships = await this.friednshipsService.searchFriendship(
      user,
      null,
    );
    if (userFriendships) {
      for (let userFriendship of userFriendships) {
        await this.friednshipsService.deleteFriendship(
          userFriendship.friendshipID,
          user,
        );
      }
    }

    // res.clearCookie('access_token');
    return await this.userModel.destroy({ where: { userID } });
  }
}
