import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/db/schemas/User.schema';
import { NewUserDto } from './user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
    userData: NewUserDto,
    options = { withPasswordHash: false },
  ): Promise<Omit<User, 'passwordHash'> & { passwordHash?: string }> {
    if (userData?.username?.length < MIN_USERNAME_LENGTH) {
      throw new UsernameTooShortError(userData.username);
    }

    if (userData?.password?.length < MIN_PASSWORD_LENGTH) {
      throw new PasswordError(
        `password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      );
    }

    const existingUser = await this.userModel
      .findOne({ username: userData.username })
      .exec();
    if (existingUser) {
      throw new UsernameAlreadyInUseError(userData.username);
    }

    const { password, ...commonData } = userData;
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

export class UsernameError extends Error {
  constructor(public readonly username: string) {
    super();
  }
  get message(): string {
    return `Error with username '${this.username}'`;
  }
}

export const MIN_USERNAME_LENGTH = 3;

export class UsernameTooShortError extends UsernameError {
  get message() {
    return `${
      super.message
    }: username must be at least ${MIN_USERNAME_LENGTH} characters long`;
  }
}

export class UsernameAlreadyInUseError extends UsernameError {
  get message(): string {
    return `${super.message}: username already in use`;
  }
}

export const MIN_PASSWORD_LENGTH = 5;

export class PasswordError extends Error {
  constructor(reason: string) {
    super(`Invalid password: ${reason}`);
  }
}
