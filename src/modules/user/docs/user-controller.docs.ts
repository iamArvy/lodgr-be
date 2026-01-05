import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { USER_CONTROLLER } from '../constants';
import { UserDto, UserResponse } from '../dto';

export const UserControllerDocs = () => {
  return applyDecorators(
    ApiTags(USER_CONTROLLER.tag),
    ApiExtraModels(UserDto, UserResponse),
  );
};
