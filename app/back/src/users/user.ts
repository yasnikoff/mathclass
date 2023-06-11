import {
  IsString,
  IsEnum,
  IsEmail,
  MinLength,
  MaxLength,
  Length,
  IsOptional,
} from 'class-validator';

export enum UserRole {
  Student = 'Student',
  Teacher = 'Teacher',
}

export class BaseUserDto {
  @IsString()
  @MinLength(5, {
    message: 'username must be at least $constraint1 characters long',
  })
  @MaxLength(15, {
    message: 'username must be at most $constraint1 characters long',
  })
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(UserRole, { message: 'user role must be either Teacher or Student' })
  role: UserRole;

  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UserDto extends BaseUserDto {
  @Length(12)
  id: string;
}

export class NewUserDto extends BaseUserDto {
  @IsString()
  @MinLength(5, {
    message: 'password must be at least $constraint1 characters long',
  })
  @MaxLength(32, {
    message: 'password must be at most $constraint1 characters long',
  })
  password: string;
}
