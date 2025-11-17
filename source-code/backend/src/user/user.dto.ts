import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from 'src/_gen/prisma-class/user';
import {
  ToLowerCaseString,
  TrimString,
} from 'src/common/decorators/transform-value.decorator';

export class UserDto {
  @TrimString()
  @IsEmail()
  @IsOptional()
  @ToLowerCaseString()
  @ApiPropertyOptional()
  email?: string;

  @TrimString()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @TrimString()
  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  @ApiPropertyOptional()
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
