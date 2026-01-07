import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { PROPERTY_ENDPOINTS, PROPERTY_MESSAGES } from '../constants';
import { PropertyResponse } from '../dto';

export const CreatePropertyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PROPERTY_ENDPOINTS.CREATE.name }),
    ApiCreatedResponse({
      description: PROPERTY_MESSAGES.created,
      type: PropertyResponse,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
    ApiConflictResponse({
      description: PROPERTY_MESSAGES.alreadyExists,
    }),
  );
};
