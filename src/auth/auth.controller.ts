import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() SignDto: Record<string, string>) {
    return this.authService.signIn(SignDto.username, SignDto.password);
  }
}
