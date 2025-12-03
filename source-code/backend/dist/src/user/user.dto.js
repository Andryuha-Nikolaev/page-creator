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
exports.UserUpdateResponseDto = exports.UserResponseDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_1 = require("../_gen/prisma-class/user");
const transform_value_decorator_1 = require("../common/decorators/transform-value.decorator");
class UserDto {
    email;
    name;
    password;
}
exports.UserDto = UserDto;
__decorate([
    (0, transform_value_decorator_1.TrimString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, transform_value_decorator_1.ToLowerCaseString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, transform_value_decorator_1.TrimString)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, transform_value_decorator_1.TrimString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
    }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
class UserWithoutPassword extends (0, swagger_1.OmitType)(user_1.User, ['password']) {
}
class UserResponseDto {
    user;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserWithoutPassword }),
    __metadata("design:type", UserWithoutPassword)
], UserResponseDto.prototype, "user", void 0);
class UserUpdateResponseDto extends (0, swagger_1.OmitType)(user_1.User, [
    'password',
    'id',
    'createdAt',
    'updatedAt',
]) {
}
exports.UserUpdateResponseDto = UserUpdateResponseDto;
//# sourceMappingURL=user.dto.js.map