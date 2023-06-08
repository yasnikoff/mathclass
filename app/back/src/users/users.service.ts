import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/db/schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find({});
  }
}
