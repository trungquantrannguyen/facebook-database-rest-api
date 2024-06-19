import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  searchUser(@Query('username') username?: string) {
    return this.usersService.searchUser(username);
  }

  @Get()
  GetUserByID(@Request() req: any) {
    return this.usersService.GetUserByID(req.user);
  }

  @Get('/:username')
  GetUserByUsername(@Param('username') username: string) {
    return this.usersService.GetUserByUsername(username);
  }

  @Patch(':userID')
  updateUser(
    @Param('userID') userID: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userID, updateUserDto);
  }

  @Delete(':userID')
  deleteUser(@Param('userID') userID: string) {
    return this.usersService.deleteUser(userID);
  }
}
