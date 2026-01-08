import { PaginationMeta } from '@hng-sdk/orm';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import {
  ApiListResponseDto,
  ApiResponseDto,
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
  @ApiProperty({ example: 'b1a2c3d4-e5f6-7890-ab12-cd34ef56gh78' })
  id: string;

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

  constructor(partial: Partial<PropertyResponseDto>) {
    Object.assign(this, partial);
  }
}

export class PropertyResponse extends ApiResponseDto {
  @ApiProperty({ type: PropertyResponseDto })
  data: PropertyResponseDto;

  constructor(message: string, data: PropertyResponseDto) {
    super();
    Object.assign(this, { message, data: new PropertyResponseDto(data) });
  }
}

export class ListPropertyResponse extends ApiListResponseDto {
  @ApiProperty({ type: [PropertyResponseDto] })
  data: PropertyResponseDto[];

  constructor(
    message: string,
    data: PropertyResponseDto[],
    meta: Partial<PaginationMeta>,
  ) {
    super();
    Object.assign(this, {
      message,
      data: plainToInstance(PropertyResponseDto, data),
      meta,
    });
  }
}
