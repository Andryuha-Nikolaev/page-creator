import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    // TODO: configure origin
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const config = new DocumentBuilder()
    .setTitle('PageCreator OpenApi')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4200);
}
void bootstrap();
