import { JwtSignOptions } from '@nestjs/jwt';
import { CookieOptions } from 'express';
export declare const AUTH_CONSTANTS: {
    EXPIRE_DAY_REFRESH_TOKEN: number;
    EXPIRE_HOUR_ACCESS_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    ACCESS_TOKEN_NAME: string;
};
export declare const JWT_SIGN_CONSTANTS: {
    EXPIRE_JWT_SIGN_REFRESH_TOKEN: JwtSignOptions['expiresIn'];
    EXPIRE_JWT_SIGN_ACCESS_TOKEN: JwtSignOptions['expiresIn'];
};
export declare const COOKIE_OPTIONS: CookieOptions;
