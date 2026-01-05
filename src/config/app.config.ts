import { registerAs } from '@nestjs/config';
import * as joi from 'joi';

export interface IAppConfig {
  env: 'development' | 'staging' | 'production' | 'test';
  port: number;
  isDev: boolean;
  name: string;
  slug: string;
  host: string;
  url: string;
  prefix: string;
  version: string;
  description?: string;
}

export const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!, 10) || 3000,
  isDev: ['development', 'dev', 'local', undefined].includes(
    process.env.NODE_ENV,
  ),
  isProd: process.env.NODE_ENV === 'production',
  isStaging: process.env.NODE_ENV === 'staging',
  name: process.env.APP_NAME!,
  slug: process.env.APP_SLUG,
  host: process.env.APP_HOST || 'localhost',
  url: process.env.APP_URL || 'http://localhost:3000',
  prefix: process.env.APP_PREFIX
    ? `${process.env.APP_PREFIX}/${process.env.APP_VERSION || 'v1'}`
    : '',
  version: process.env.APP_VERSION || 'v1',
  description: process.env.APP_DESCRIPTION,
}));

export const appValidation = joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'staging', 'production', 'test')
    .default('development'),
  PORT: joi.number().default(3000),
  APP_NAME: joi.string().default('Nest Application'),
  APP_SLUG: joi.string().default('nest-application'),
  APP_HOST: joi.string().default('localhost'),
  APP_URL: joi.string().uri().default('http://localhost:3000'),
  APP_PREFIX: joi.string().allow('').optional(),
  APP_VERSION: joi.string().default('v1'),
  APP_DESCRIPTION: joi.string().allow('').optional(),
});
