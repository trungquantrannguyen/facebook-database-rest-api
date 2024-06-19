import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string) {
    const user = await this.usersService.GetUserByUsername(username);
    // console.log(user.dataValues);
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(pass, user.dataValues.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user.dataValues;
    // console.log(result);
    return result;
  }
  async signIn(user: any, res: any) {
    const payload = { userID: user.userID, username: user.username };
    // console.log(process.env.JWT_SECRET);
    const token = await this.jwtService.signAsync(payload);
    res.cookie('access_token', token);
    // console.log(token);
    return { user, token };
  }
}
