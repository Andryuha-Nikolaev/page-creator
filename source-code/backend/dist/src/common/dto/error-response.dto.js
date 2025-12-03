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
exports.InternalServerErrorResponseDto = exports.UnprocessableEntityErrorResponseDto = exports.NotFoundErrorResponseDto = exports.UnauthorizedErrorResponseDto = exports.BadRequestErrorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BadRequestErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.BadRequestErrorResponseDto = BadRequestErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 400 }),
    __metadata("design:type", Number)
], BadRequestErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User already exists' }),
    __metadata("design:type", String)
], BadRequestErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bad Request' }),
    __metadata("design:type", String)
], BadRequestErrorResponseDto.prototype, "error", void 0);
class UnauthorizedErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.UnauthorizedErrorResponseDto = UnauthorizedErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 401 }),
    __metadata("design:type", Number)
], UnauthorizedErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unauthorized' }),
    __metadata("design:type", String)
], UnauthorizedErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unauthorized' }),
    __metadata("design:type", String)
], UnauthorizedErrorResponseDto.prototype, "error", void 0);
class NotFoundErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.NotFoundErrorResponseDto = NotFoundErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 404 }),
    __metadata("design:type", Number)
], NotFoundErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User not found' }),
    __metadata("design:type", String)
], NotFoundErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Not Found' }),
    __metadata("design:type", String)
], NotFoundErrorResponseDto.prototype, "error", void 0);
class UnprocessableEntityErrorResponseDto {
    statusCode;
    error;
    errors;
}
exports.UnprocessableEntityErrorResponseDto = UnprocessableEntityErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 422 }),
    __metadata("design:type", Number)
], UnprocessableEntityErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unprocessable Entity' }),
    __metadata("design:type", String)
], UnprocessableEntityErrorResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            name: ['name must be a string'],
            email: ['email must be a valid email address'],
            password: ['password must be at least 8 characters'],
        },
    }),
    __metadata("design:type", Object)
], UnprocessableEntityErrorResponseDto.prototype, "errors", void 0);
class InternalServerErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.InternalServerErrorResponseDto = InternalServerErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], InternalServerErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Internal server error' }),
    __metadata("design:type", String)
], InternalServerErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Internal Server Error' }),
    __metadata("design:type", String)
], InternalServerErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=error-response.dto.js.map