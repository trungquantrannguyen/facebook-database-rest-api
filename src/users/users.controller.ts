import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  searchUser(@Query('username') username?: string) {
    return this.usersService.searchUser(username);
  }

  @Get('/id/:userID')
  GetUserByID(@Param('userID') userID: string) {
    return this.usersService.GetUserByID(userID);
  }

  @Get('/username/:username')
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
