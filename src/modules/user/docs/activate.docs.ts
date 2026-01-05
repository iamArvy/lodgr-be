import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';
export const ActivateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.ACTIVATE.name }),
    ApiOkResponse({ description: USER_MESSAGES.activated }),
    ApiNotFoundResponse({ description: USER_MESSAGES.notFound }),
    ApiBadRequestResponse({
      description: USER_MESSAGES.alreadyActive,
    }),
  );
};
