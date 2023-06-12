import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/db/schemas/User.schema';
import { NewUserDto, UserDto } from './user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Data, validate } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find({});
  }

  async createUser(
    userData: Data<NewUserDto>,
    options = { withPasswordHash: false },
  ): Promise<Omit<UserDto, 'passwordHash'> & { passwordHash?: string }> {
    const { password, ...commonData } = userData;

    try {
      await validate(NewUserDto, userData);
    } catch (e) {
      throw new SignUpError(e as Error);
    }

    const existingUser = await this.userModel
      .findOne({ username: userData.username })
      .exec();
    if (existingUser) {
      throw new UsernameAlreadyInUseError(userData.username);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await this.userModel.create({
      ...commonData,
      passwordHash,
    });
    return {
      ...commonData,
      id: createdUser._id.toString(),
      ...(options?.withPasswordHash ? { passwordHash } : {}),
    };
  }
}

export class SignUpError extends Error {
  constructor(cause: string | Error) {
    super(
      `Can't create new user. ${
        cause instanceof Error ? cause.message : cause
      }`,
    );
  }
}

export class UsernameAlreadyInUseError extends Error {
  constructor(username: string) {
    super(`username '${username}' already used`);
  }
}
