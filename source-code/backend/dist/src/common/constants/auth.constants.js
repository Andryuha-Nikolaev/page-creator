"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_OPTIONS = exports.JWT_SIGN_CONSTANTS = exports.AUTH_CONSTANTS = void 0;
exports.AUTH_CONSTANTS = {
    EXPIRE_DAY_REFRESH_TOKEN: 7,
    EXPIRE_HOUR_ACCESS_TOKEN: 1,
    REFRESH_TOKEN_NAME: 'refreshToken',
    ACCESS_TOKEN_NAME: 'accessToken',
};
exports.JWT_SIGN_CONSTANTS = {
    EXPIRE_JWT_SIGN_REFRESH_TOKEN: '7d',
    EXPIRE_JWT_SIGN_ACCESS_TOKEN: '1h',
};
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
};
//# sourceMappingURL=auth.constants.js.map