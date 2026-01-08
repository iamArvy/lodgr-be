import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { PROPERTY_ENDPOINTS, PROPERTY_MESSAGES } from '../constants';
import { ListPropertyResponse } from '../dto';

export const ListPropertyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PROPERTY_ENDPOINTS.LIST.name }),
    ApiOkResponse({
      description: PROPERTY_MESSAGES.listed,
      type: ListPropertyResponse,
    }),
  );
};
