import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';

export const PatchUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.PATCH.name }),
    ApiOkResponse({ description: USER_MESSAGES.patched }),
    ApiNotFoundResponse({ description: USER_MESSAGES.notFound }),
    ApiConflictResponse({ description: USER_MESSAGES.alreadyExists }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
