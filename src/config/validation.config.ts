import { registerAs } from '@nestjs/config';

export const validationConfig = registerAs('validation', () => ({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true },
}));
export type IValidationConfig = ReturnType<typeof validationConfig>;
