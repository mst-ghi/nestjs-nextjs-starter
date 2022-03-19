import { AppModeEnum } from '@app/enums';
import { Compression, Helmet, Json, Morgan, Urlencoded } from '@app/middleware';
import {
  ForbiddenExceptionFilter,
  InternalExceptionFilter,
  SwaggerStarter,
  UnauthorizedExceptionFilter,
  Validation,
} from '@app/shared';
import { VersioningType, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(Helmet);
  app.use(Compression);
  app.use(Morgan);
  app.use(Json);
  app.use(Urlencoded);

  app.useGlobalPipes(
    new Validation({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  if (process.env.NODE_ENV != AppModeEnum.Development) {
    app.useGlobalFilters(new InternalExceptionFilter());
  }
  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  SwaggerStarter.start(app);

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
