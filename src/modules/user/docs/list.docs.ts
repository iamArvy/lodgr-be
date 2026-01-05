import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';
import { ListUserResponse } from '../dto';

export const ListUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.LIST.name }),
    ApiOkResponse({
      description: USER_MESSAGES.listed,
      type: ListUserResponse,
    }),
  );
};
