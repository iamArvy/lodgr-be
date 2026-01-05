import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { USER_ENDPOINTS, USER_MESSAGES } from '../constants';
import { UserResponse } from '../dto';

export const CreateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: USER_ENDPOINTS.CREATE.name }),
    ApiCreatedResponse({
      description: 'User created successfully',
      type: UserResponse,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
    ApiConflictResponse({
      description: USER_MESSAGES.alreadyExists,
    }),
  );
};
