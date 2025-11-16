import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto, UserResponseDto, UserUpdateResponseDto } from './user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiErrorCommonResponses,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from 'src/common/decorators/api-responses.decorator';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @ApiResponse({ type: UserResponseDto })
  @ApiErrorCommonResponses()
  @ApiUnauthorizedResponse()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  @ApiResponse({ status: HttpStatus.OK, type: UserUpdateResponseDto })
  @ApiErrorCommonResponses()
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
