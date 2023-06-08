import { IsString, IsEnum, IsEmail, IsPositive } from 'class-validator';

export enum UserRole {
  Admin = 'Admin',
  Student = 'Student',
  Teacher = 'Teacher',
  Guest = 'Guest',
}

export class UserDto {
  @IsPositive()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export type NewUserDto = Omit<UserDto, 'id'> & { password: string };
