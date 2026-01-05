import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';

export const DeactivateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.DEACTIVATE.name }),
    ApiOkResponse({ description: USER_MESSAGES.deactivated }),
    ApiNotFoundResponse({ description: USER_MESSAGES.notFound }),
    ApiBadRequestResponse({
      description: USER_MESSAGES.alreadyDeactivated,
    }),
  );
};
