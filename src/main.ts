import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, GlobalExceptionFilter } from '@libs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('Order Service API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const host = process.env.HOST;
  const port = parseInt(process.env.PORT || '3000');
  await app.listen(port, host, () => {
    Logger.log(`Application is running at: ${host}:${port}`);
  });
}
bootstrap();
