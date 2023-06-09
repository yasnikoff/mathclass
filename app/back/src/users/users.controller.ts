import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard, Public } from 'src/auth';
import { User } from 'src/db/schemas/User.schema';
import { NewUserDto } from './user';
import {
  UsersService,
  UsernameAlreadyInUseError,
  SignUpError,
} from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(@Query('role') role): Promise<User[]> {
    return this.service.getUsers(role);
  }

  @Get(':username')
  async getUserByUsername(@Param() params) {
    return this.service.getUserByUsername(params.username);
  }

  @Post()
  @Public()
  async createUser(@Body() body: NewUserDto) {
    try {
      return await this.service.createUser(body);
    } catch (e) {
      if (e instanceof UsernameAlreadyInUseError)
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      if (e instanceof SignUpError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw e;
    }
  }
}
