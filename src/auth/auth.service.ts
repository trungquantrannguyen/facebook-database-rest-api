import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
