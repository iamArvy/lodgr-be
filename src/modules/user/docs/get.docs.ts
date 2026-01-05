import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';
import { UserResponse } from '../dto';

export const GetUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: USER_MESSAGES.found,
      type: UserResponse,
    }),
    ApiNotFoundResponse({ description: USER_MESSAGES.notFound }),
  );
};
