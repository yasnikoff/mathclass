import { IsString, IsEnum, IsEmail, IsPositive } from 'class-validator';

export enum UserRole {
  Admin = 'Admin',
  Student = 'Student',
  Teacher = 'Teacher',
  Guest = 'Guest',
}

export class UserDto {
  @IsPositive()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  avatar: string;
}

export type NewUserDto = Omit<UserDto, 'id'> & { password: string };
