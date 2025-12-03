"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestResponse = BadRequestResponse;
exports.UnauthorizedResponse = UnauthorizedResponse;
exports.UnprocessableEntityResponse = UnprocessableEntityResponse;
exports.ErrorCommonResponses = ErrorCommonResponses;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_response_dto_1 = require("../dto/error-response.dto");
function BadRequestResponse() {
    return (0, swagger_1.ApiBadGatewayResponse)({
        type: error_response_dto_1.BadRequestErrorResponseDto,
    });
}
function UnauthorizedResponse() {
    return (0, swagger_1.ApiUnauthorizedResponse)({
        type: error_response_dto_1.UnauthorizedErrorResponseDto,
    });
}
function NotFoundResponse() {
    return (0, swagger_1.ApiNotFoundResponse)({
        type: error_response_dto_1.NotFoundErrorResponseDto,
    });
}
function UnprocessableEntityResponse() {
    return (0, swagger_1.ApiUnprocessableEntityResponse)({
        type: error_response_dto_1.UnprocessableEntityErrorResponseDto,
    });
}
function InternalServerErrorResponse() {
    return (0, swagger_1.ApiInternalServerErrorResponse)({
        type: error_response_dto_1.InternalServerErrorResponseDto,
    });
}
function ErrorCommonResponses() {
    return (0, common_1.applyDecorators)(NotFoundResponse(), InternalServerErrorResponse());
}
//# sourceMappingURL=error-response.decorator.js.map