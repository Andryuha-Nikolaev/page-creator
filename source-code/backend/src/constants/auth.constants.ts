import { JwtSignOptions } from '@nestjs/jwt';

export const AUTH_CONSTANTS = {
  EXPIRE_DAY_REFRESH_TOKEN: 7,
  EXPIRE_HOUR_ACCESS_TOKEN: 1,

  REFRESH_TOKEN_NAME: 'refreshToken',
  ACCESS_TOKEN_NAME: 'accessToken',
};

export const JWT_SIGN_CONSTANTS: {
  EXPIRE_JWT_SIGN_REFRESH_TOKEN: JwtSignOptions['expiresIn'];
  EXPIRE_JWT_SIGN_ACCESS_TOKEN: JwtSignOptions['expiresIn'];
} = {
  EXPIRE_JWT_SIGN_REFRESH_TOKEN: '7d',
  EXPIRE_JWT_SIGN_ACCESS_TOKEN: '1h',
};
