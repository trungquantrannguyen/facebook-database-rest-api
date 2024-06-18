import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.GetUserByUsername(username);
    // console.log(user.dataValues);
    if (!bcrypt.compare(user?.dataValues.password, password)) {
      throw new UnauthorizedException();
    }

    // console.log(process.env.JWT_SECRET);

    const payload = { sub: user.userID, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
