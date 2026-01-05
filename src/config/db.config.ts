import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import joi from 'joi';

import { appConfig } from './app.config';

const { isDev, isProd, isStaging } = appConfig();

export const dbConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    // Auto-load entities from TypeOrmModule.forFeature() in all modules
    autoLoadEntities: true,

    // CRITICAL: Only synchronize in development
    // In production, schema changes MUST go through migrations
    synchronize: isDev,

    // Automatically run pending migrations on application start in production
    migrationsRun: isProd || isStaging,

    // Migration configuration
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',

    // SSL configuration for production databases
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,

    // Logging configuration
    logging: isDev ? true : ['error', 'warn', 'migration'],
  }),
);

export const dbValidation = joi.object({
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PASS: joi.string().required(),
  DB_NAME: joi.string().required(),
});
