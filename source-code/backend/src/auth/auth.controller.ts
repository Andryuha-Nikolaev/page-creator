import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AUTH_CONSTANTS } from 'src/common/constants/auth.constants';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/user.dto';
import {
  ApiErrorCommonResponses,
  ApiUnprocessableEntityResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from 'src/common/decorators/error-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrorCommonResponses()
  @ApiUnprocessableEntityResponse()
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, ...response } =
      await this.authService.login(dto);
    this.authService.addAccessTokenToResponse(res, accessToken);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrorCommonResponses()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, ...response } =
      await this.authService.register(dto);
    this.authService.addAccessTokenToResponse(res, accessToken);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('login/access-token')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrorCommonResponses()
  @ApiUnauthorizedResponse()
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies = req.cookies[
      AUTH_CONSTANTS.REFRESH_TOKEN_NAME
    ] as unknown;

    if (!refreshTokenFromCookies) {
      this.authService.removeAccessTokenFromResponse(res);
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { accessToken, refreshToken, ...response } =
      await this.authService.getNewTokens(
        typeof refreshTokenFromCookies === 'string'
          ? refreshTokenFromCookies
          : '',
      );

    this.authService.addAccessTokenToResponse(res, accessToken);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @HttpCode(200)
  @Post('logout')
  @ApiOkResponse({ type: Boolean })
  @ApiErrorCommonResponses()
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeAccessTokenFromResponse(res);
    this.authService.removeRefreshTokenFromResponse(res);
    return true;
  }
}
