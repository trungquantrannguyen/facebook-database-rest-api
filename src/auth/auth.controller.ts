import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signIn(@Request() req, @Response({ passthrough: true }) res: any) {
    return this.authService.signIn(req.user, res);
  }

  @Get('user')
  getUser(@Request() req: any) {
    return req.user;
  }
}
