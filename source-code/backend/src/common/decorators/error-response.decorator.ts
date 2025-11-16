import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
  NotFoundErrorResponseDto,
  UnauthorizedErrorResponseDto,
  UnprocessableEntityErrorResponseDto,
} from '../dto/error-response.dto';

export function ApiBadRequestResponse() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadRequestErrorResponseDto,
    }),
  );
}

export function ApiUnauthorizedResponse() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: UnauthorizedErrorResponseDto,
    }),
  );
}

function ApiNotFoundResponse() {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description: 'Not Found',
      type: NotFoundErrorResponseDto,
    }),
  );
}

export function ApiUnprocessableEntityResponse() {
  return applyDecorators(
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: UnprocessableEntityErrorResponseDto,
    }),
  );
}

function ApiInternalServerErrorResponse() {
  return applyDecorators(
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: InternalServerErrorResponseDto,
    }),
  );
}

export function ApiErrorCommonResponses() {
  return applyDecorators(
    ApiNotFoundResponse(),
    ApiInternalServerErrorResponse(),
  );
}
