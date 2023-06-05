import { Injectable } from '@nestjs/common';

import { User as UserDto } from '../users/user';
import users from './data/test_users';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/db/schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly users = users;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneLocal(username: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
