import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import {
  ToLowerCaseString,
  TrimString,
} from '../../common/decorators/transform-value.decorator';

export class AuthDto {
  @TrimString()
  @IsEmail()
  @ToLowerCaseString()
  @ApiProperty()
  email: string;

  @TrimString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  @ApiProperty()
  password: string;
}
