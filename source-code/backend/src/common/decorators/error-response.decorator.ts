import { applyDecorators } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BadRequestErrorResponseDto,
  InternalServerErrorResponseDto,
  NotFoundErrorResponseDto,
  UnauthorizedErrorResponseDto,
  UnprocessableEntityErrorResponseDto,
} from '../dto/error-response.dto';

export function BadRequestResponse() {
  return ApiBadGatewayResponse({
    type: BadRequestErrorResponseDto,
  });
}

export function UnauthorizedResponse() {
  return ApiUnauthorizedResponse({
    type: UnauthorizedErrorResponseDto,
  });
}

function NotFoundResponse() {
  return ApiNotFoundResponse({
    type: NotFoundErrorResponseDto,
  });
}

export function UnprocessableEntityResponse() {
  return ApiUnprocessableEntityResponse({
    type: UnprocessableEntityErrorResponseDto,
  });
}

function InternalServerErrorResponse() {
  return ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
  });
}

export function ErrorCommonResponses() {
  return applyDecorators(NotFoundResponse(), InternalServerErrorResponse());
}
