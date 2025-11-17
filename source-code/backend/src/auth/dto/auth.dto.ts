import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  @ApiProperty()
  password: string;
}
