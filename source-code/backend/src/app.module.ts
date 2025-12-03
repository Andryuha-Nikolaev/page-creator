import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { CustomFieldsValidationPipe } from './common/pipes/custom-fields-validation.pipe';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomFieldsValidationPipe,
    },
  ],
})
export class AppModule {}
