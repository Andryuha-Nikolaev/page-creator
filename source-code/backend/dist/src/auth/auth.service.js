"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_constants_1 = require("./../common/constants/auth.constants");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const user_service_1 = require("../user/user.service");
const auth_constants_2 = require("../common/constants/auth.constants");
let AuthService = class AuthService {
    jwt;
    userService;
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.userService.getByEmail(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('User already exists');
        const { password, ...user } = await this.userService.create(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const userData = await this.userService.getById(result.id);
        if (!userData)
            throw new common_1.UnauthorizedException('User not found');
        const { password, ...user } = userData;
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: auth_constants_2.JWT_SIGN_CONSTANTS.EXPIRE_JWT_SIGN_ACCESS_TOKEN,
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: auth_constants_2.JWT_SIGN_CONSTANTS.EXPIRE_JWT_SIGN_REFRESH_TOKEN,
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    addAccessTokenToResponse(res, accessToken) {
        const expiresIn = new Date();
        expiresIn.setHours(expiresIn.getHours() + auth_constants_2.AUTH_CONSTANTS.EXPIRE_HOUR_ACCESS_TOKEN);
        res.cookie(auth_constants_2.AUTH_CONSTANTS.ACCESS_TOKEN_NAME, accessToken, {
            expires: expiresIn,
            ...auth_constants_1.COOKIE_OPTIONS,
        });
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + auth_constants_2.AUTH_CONSTANTS.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(auth_constants_2.AUTH_CONSTANTS.REFRESH_TOKEN_NAME, refreshToken, {
            expires: expiresIn,
            ...auth_constants_1.COOKIE_OPTIONS,
        });
    }
    removeAccessTokenFromResponse(res) {
        res.cookie(auth_constants_2.AUTH_CONSTANTS.ACCESS_TOKEN_NAME, '', {
            expires: new Date(0),
            ...auth_constants_1.COOKIE_OPTIONS,
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(auth_constants_2.AUTH_CONSTANTS.REFRESH_TOKEN_NAME, '', {
            expires: new Date(0),
            ...auth_constants_1.COOKIE_OPTIONS,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map