import {
  ClassSerializerInterceptor,
  LoggerService,
  ValidationPipe,
} from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { IAppConfig, ISwaggerConfig, IValidationConfig } from './config';
import { MetricsMiddleware } from './modules/metrics/metrics.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const { name, isDev, env, port, url, prefix } =
    config.getOrThrow<IAppConfig>('app');

  // Global Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger Docs
  const { path, options, document } =
    config.getOrThrow<ISwaggerConfig>('swagger');

  SwaggerModule.setup(
    path,
    app,
    SwaggerModule.createDocument(app, document),
    options,
  );

  // Metrics Middleware
  app.use((req: Request, res: Response, next: NextFunction) =>
    new MetricsMiddleware().use(req, res, next),
  );

  // CORS
  const corsOptions = config.getOrThrow<CorsOptions>('cors');
  app.enableCors(corsOptions);

  // Global Prefix
  app.setGlobalPrefix(prefix, { exclude: [path] });

  // Global Pipes
  const validationOptions = config.getOrThrow<IValidationConfig>('validation');
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  if (isDev) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call
    app.use(require('morgan')('dev'));
  }

  await app.listen(port);

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(
    `
      ------------
      Internal Application Started!
      Environment: ${env}
      API:${url}
      API Docs: ${url}/docs
      ------------
  `,
    ` ${name} | ${env}`,
  );
}
void bootstrap();
