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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getById(id) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    getByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async getProfile(id) {
        const profile = await this.getById(id);
        if (!profile)
            throw new common_1.UnauthorizedException('User not found');
        const { password, ...rest } = profile;
        return {
            user: rest,
        };
    }
    async create(dto) {
        const user = {
            email: dto.email,
            name: '',
            password: await (0, argon2_1.hash)(dto.password),
        };
        return this.prisma.user.create({
            data: user,
        });
    }
    async update(id, dto) {
        let data = dto;
        if (dto.password) {
            data = { ...dto, password: await (0, argon2_1.hash)(dto.password) };
        }
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                name: true,
                email: true,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map