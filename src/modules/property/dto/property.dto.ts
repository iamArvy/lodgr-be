import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  createApiPaginatedResponseDto,
  createApiResponseDto,
} from 'src/common/dto/api-response.dto';

import { Amenity, ListingType, PropertyType } from '../entities';

import {
  AdditionalDetailsDto,
  LocationDto,
  RentDetailsDto,
  SaleDetailsDto,
} from './create-property.dto';

@ApiExtraModels(RentDetailsDto, SaleDetailsDto)
@Exclude()
export class PropertyResponseDto {
  @Expose()
  @ApiProperty({ example: 'Luxury 4 Bedroom Duplex' })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'A well-finished 4-bedroom duplex in Lekki',
    required: false,
  })
  description?: string;

  @Expose()
  @ApiProperty({ enum: PropertyType })
  propertyType: PropertyType;

  @Expose()
  @ApiProperty({ type: LocationDto })
  location: LocationDto;

  @Expose()
  @ApiProperty({ type: AdditionalDetailsDto, required: false })
  additionalDetails?: AdditionalDetailsDto;

  @Expose()
  @ApiProperty({
    enum: Amenity,
    isArray: true,
    required: false,
  })
  amenities?: Amenity[];

  @Expose()
  @ApiProperty({ enum: ListingType, example: ListingType.SALE })
  listingType: ListingType;

  @Expose()
  @ApiProperty({
    description: 'Either rentDetails or saleDetails depending on listingType',
    oneOf: [
      { $ref: getSchemaPath(RentDetailsDto) },
      { $ref: getSchemaPath(SaleDetailsDto) },
    ],
  })
  propertyDetails: RentDetailsDto | SaleDetailsDto;

  @Expose()
  @ApiProperty({ example: '2026-01-07T12:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-01-07T12:00:00.000Z' })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ example: false })
  deleted: boolean;
}

export const PropertyResponse = createApiResponseDto(PropertyResponseDto);

export const ListPropertyResponse =
  createApiPaginatedResponseDto(PropertyResponseDto);
