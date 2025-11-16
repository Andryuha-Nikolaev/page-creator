import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from 'src/_gen/prisma-class/user';

export class UserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  @ApiProperty()
  password?: string;
}

class UserWithoutPassword extends OmitType(User, ['password']) {}

export class UserResponseDto {
  @ApiProperty({ type: UserWithoutPassword })
  user: UserWithoutPassword;
}

export class UserUpdateResponseDto extends OmitType(User, [
  'password',
  'id',
  'createdAt',
  'updatedAt',
]) {}
