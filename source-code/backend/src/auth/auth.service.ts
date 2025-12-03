import { COOKIE_OPTIONS } from './../common/constants/auth.constants';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import {
  AUTH_CONSTANTS,
  JWT_SIGN_CONSTANTS,
} from '../common/constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync<{ id: string }>(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const userData = await this.userService.getById(result.id);

    if (!userData) throw new UnauthorizedException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userData;

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: JWT_SIGN_CONSTANTS.EXPIRE_JWT_SIGN_ACCESS_TOKEN,
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: JWT_SIGN_CONSTANTS.EXPIRE_JWT_SIGN_REFRESH_TOKEN,
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  addAccessTokenToResponse(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setHours(
      expiresIn.getHours() + AUTH_CONSTANTS.EXPIRE_HOUR_ACCESS_TOKEN,
    );

    res.cookie(AUTH_CONSTANTS.ACCESS_TOKEN_NAME, accessToken, {
      expires: expiresIn,
      ...COOKIE_OPTIONS,
    });
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(
      expiresIn.getDate() + AUTH_CONSTANTS.EXPIRE_DAY_REFRESH_TOKEN,
    );

    res.cookie(AUTH_CONSTANTS.REFRESH_TOKEN_NAME, refreshToken, {
      expires: expiresIn,
      ...COOKIE_OPTIONS,
    });
  }

  removeAccessTokenFromResponse(res: Response) {
    res.cookie(AUTH_CONSTANTS.ACCESS_TOKEN_NAME, '', {
      expires: new Date(0),
      ...COOKIE_OPTIONS,
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(AUTH_CONSTANTS.REFRESH_TOKEN_NAME, '', {
      expires: new Date(0),
      ...COOKIE_OPTIONS,
    });
  }
}
