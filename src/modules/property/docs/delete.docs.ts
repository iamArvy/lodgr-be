import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { PROPERTY_ENDPOINTS, PROPERTY_MESSAGES } from '../constants';

export const DeletePropertyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PROPERTY_ENDPOINTS.DELETE.name }),
    ApiOkResponse({ description: PROPERTY_MESSAGES.deleted }),
    ApiNotFoundResponse({ description: PROPERTY_MESSAGES.notFound }),
    ApiBadRequestResponse({
      description: PROPERTY_MESSAGES.alreadyDeleted,
    }),
  );
};
