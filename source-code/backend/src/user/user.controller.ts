import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserDto, UserResponseDto, UserUpdateResponseDto } from './user.dto';
import { UserService } from './user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ErrorCommonResponses,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from '../common/decorators/error-response.decorator';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @ApiOkResponse({ type: UserResponseDto })
  @ErrorCommonResponses()
  @UnauthorizedResponse()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  @ApiOkResponse({ type: UserUpdateResponseDto })
  @ErrorCommonResponses()
  @UnauthorizedResponse()
  @UnprocessableEntityResponse()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
