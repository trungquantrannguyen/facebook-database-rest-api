import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    const usernameExist = await this.usersService.GetUserByUsername(
      request.body.username,
    );
    if (usernameExist) {
      throw new ForbiddenException('This username already exist');
    }

    const emailExist = await this.usersService.GetUserByEmail(
      request.body.email,
    );
    if (emailExist) {
      throw new ForbiddenException('This username already exist');
    }

    return true;
  }
}
