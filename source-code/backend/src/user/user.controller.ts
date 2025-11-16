import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ApiErrorCommonResponses,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from 'src/common/decorators/error-response.decorator';
import { UserResponse, UserUpdateResponse } from './user.entity';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @ApiOkResponse({ type: UserResponse })
  @ApiErrorCommonResponses()
  @ApiUnauthorizedResponse()
  async profile(@CurrentUser('id') id: string): Promise<UserResponse> {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  @ApiOkResponse({ type: UserUpdateResponse })
  @ApiErrorCommonResponses()
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  async updateProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UserDto,
  ): Promise<UserUpdateResponse> {
    return this.userService.update(id, dto);
  }
}
