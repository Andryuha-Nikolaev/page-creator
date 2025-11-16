import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { AUTH_CONSTANTS } from 'src/constants/auth.constants';
import { env } from 'prisma/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token: string | null = null;

          if (request && request.cookies) {
            const accessTokenCookie = request.cookies[
              AUTH_CONSTANTS.ACCESS_TOKEN_NAME
            ] as unknown;

            token =
              typeof accessTokenCookie === 'string' ? accessTokenCookie : null;
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env('JWT_SECRET'),
    });
  }

  async validate({ id }: { id: string }) {
    return this.userService.getById(id);
  }
}
