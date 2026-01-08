import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { PROPERTY_ENDPOINTS, PROPERTY_MESSAGES } from '../constants';

export const UpdatePropertyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PROPERTY_ENDPOINTS.UPDATE.name }),
    ApiOkResponse({ description: PROPERTY_MESSAGES.updated }),
    ApiNotFoundResponse({ description: PROPERTY_MESSAGES.notFound }),
    ApiConflictResponse({ description: PROPERTY_MESSAGES.alreadyExists }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
