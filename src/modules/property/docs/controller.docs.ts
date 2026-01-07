import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { PROPERTY_CONTROLLER } from '../constants';
import {
  PropertyResponseDto,
  PropertyResponse,
  RentDetailsDto,
  SaleDetailsDto,
} from '../dto';

export const PropertyControllerDocs = () => {
  return applyDecorators(
    ApiTags(PROPERTY_CONTROLLER.tag),
    ApiExtraModels(
      PropertyResponseDto,
      PropertyResponse,
      RentDetailsDto,
      SaleDetailsDto,
    ),
  );
};
