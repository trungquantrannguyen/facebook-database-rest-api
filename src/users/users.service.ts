import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userModel.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashPassword,
      fullname: createUserDto.fullname,
      bio: createUserDto.bio,
    });
  }
  async searchUser(username?: string): Promise<User[]> {
    if (username) {
      return await this.userModel.findAll({
        where: { username: { [Op.regexp]: username } },
        order: [['created_at', 'DESC']],
        limit: 10,
      });
    }
    return await this.userModel.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
    });
  }
  async GetUserByID(userID: string): Promise<User> {
    return await this.userModel.findByPk(userID);
  }

  async updateUser(
    userID: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userModel.update(
      { ...updateUserDto },
      { where: { userID }, returning: true },
    );
  }
  async deleteUser(userID: string): Promise<number> {
    return await this.userModel.destroy({ where: { userID } });
  }
}
