import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/db/schemas/User.schema';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':username')
  async getUserByUsername(@Param() params) {
    return this.service.getUserByUsername(params.username);
  }
}
