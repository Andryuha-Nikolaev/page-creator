import {
  Module,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: (errors) => {
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
      }),
    },
  ],
})
export class AppModule {}
