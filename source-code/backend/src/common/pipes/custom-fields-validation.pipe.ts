import {
  ValidationPipe,
  UnprocessableEntityException,
  ValidationError,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CustomFieldsValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
          statusCode: 422,
          error: 'Unprocessable Entity',
          errors: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints ?? ''),
            }),
            {},
          ),
        });
      },
    });
  }
}
