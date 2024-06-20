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
import { Public } from 'src/auth/decorators/auth.decorator';
import { DoesUserExist } from './doesUserExist.guard';
import { ClearCookies } from '@nestjsplus/cookies';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UseGuards(DoesUserExist)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  searchUser(@Query('username') username?: string) {
    return this.usersService.searchUser(username);
  }

  @Get(':userID')
  GetUserByID(@Param('userID') userID: any) {
    return this.usersService.GetUserByID(userID);
  }

  @Patch()
  updateUser(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user, updateUserDto);
  }

  @ClearCookies('access_token')
  @Delete()
  deleteUser(@Request() req: any) {
    // res.clearCookie('access_token');
    return this.usersService.deleteUser(req.user);
  }
}
