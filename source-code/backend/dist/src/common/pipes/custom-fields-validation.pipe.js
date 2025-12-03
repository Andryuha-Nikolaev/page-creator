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
exports.CustomFieldsValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let CustomFieldsValidationPipe = class CustomFieldsValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors) => {
                return new common_1.UnprocessableEntityException({
                    statusCode: 422,
                    error: 'Unprocessable Entity',
                    errors: errors.reduce((acc, e) => ({
                        ...acc,
                        [e.property]: Object.values(e.constraints ?? ''),
                    }), {}),
                });
            },
        });
    }
};
exports.CustomFieldsValidationPipe = CustomFieldsValidationPipe;
exports.CustomFieldsValidationPipe = CustomFieldsValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CustomFieldsValidationPipe);
//# sourceMappingURL=custom-fields-validation.pipe.js.map