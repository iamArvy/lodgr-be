import { appConfig, appValidation } from './app.config';
import { corsConfig, corsValidation } from './cors.config';
import { dbConfig, dbValidation } from './db.config';
import { swaggerConfig } from './swagger.config';
import { validationConfig } from './validation.config';
import { winstonValidation } from './winston.config';

export const config = [
  appConfig,
  corsConfig,
  dbConfig,
  swaggerConfig,
  validationConfig,
];

export const validationSchema = appValidation
  .concat(corsValidation)
  .concat(winstonValidation)
  .concat(dbValidation);
