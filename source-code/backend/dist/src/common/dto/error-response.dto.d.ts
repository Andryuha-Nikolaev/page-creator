export declare class BadRequestErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class UnauthorizedErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class NotFoundErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
export declare class UnprocessableEntityErrorResponseDto {
    statusCode: number;
    error: string;
    errors: Record<string, string[]>;
}
export declare class InternalServerErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
