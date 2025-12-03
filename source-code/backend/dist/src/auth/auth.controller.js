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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const auth_constants_1 = require("../common/constants/auth.constants");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../user/user.dto");
const error_response_decorator_1 = require("../common/decorators/error-response.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto, res) {
        const { accessToken, refreshToken, ...response } = await this.authService.login(dto);
        this.authService.addAccessTokenToResponse(res, accessToken);
        this.authService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    async register(dto, res) {
        const { accessToken, refreshToken, ...response } = await this.authService.register(dto);
        this.authService.addAccessTokenToResponse(res, accessToken);
        this.authService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    async getNewTokens(req, res) {
        const refreshTokenFromCookies = req.cookies[auth_constants_1.AUTH_CONSTANTS.REFRESH_TOKEN_NAME];
        if (!refreshTokenFromCookies) {
            this.authService.removeAccessTokenFromResponse(res);
            this.authService.removeRefreshTokenFromResponse(res);
            throw new common_1.UnauthorizedException('Refresh token not passed');
        }
        const { accessToken, refreshToken, ...response } = await this.authService.getNewTokens(typeof refreshTokenFromCookies === 'string'
            ? refreshTokenFromCookies
            : '');
        this.authService.addAccessTokenToResponse(res, accessToken);
        this.authService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    logout(res) {
        this.authService.removeAccessTokenFromResponse(res);
        this.authService.removeRefreshTokenFromResponse(res);
        return true;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserResponseDto }),
    (0, error_response_decorator_1.ErrorCommonResponses)(),
    (0, error_response_decorator_1.UnprocessableEntityResponse)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserResponseDto }),
    (0, error_response_decorator_1.ErrorCommonResponses)(),
    (0, error_response_decorator_1.BadRequestResponse)(),
    (0, error_response_decorator_1.UnauthorizedResponse)(),
    (0, error_response_decorator_1.UnprocessableEntityResponse)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login/access-token'),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserResponseDto }),
    (0, error_response_decorator_1.ErrorCommonResponses)(),
    (0, error_response_decorator_1.UnauthorizedResponse)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewTokens", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOkResponse)({ type: Boolean }),
    (0, error_response_decorator_1.ErrorCommonResponses)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map