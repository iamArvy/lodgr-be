import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { PROPERTY_ENDPOINTS, PROPERTY_MESSAGES } from '../constants';
import { PropertyResponseDto } from '../dto';

export const GetPropertyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PROPERTY_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: PROPERTY_MESSAGES.found,
      type: PropertyResponseDto,
    }),
    ApiNotFoundResponse({ description: PROPERTY_MESSAGES.notFound }),
  );
};
