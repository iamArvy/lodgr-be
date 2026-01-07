import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  Amenity,
  ListingType,
  PropertyType,
} from '../entities/property.entity';

/* -------------------- Nested DTOs -------------------- */

export class LocationDto {
  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  country: string;

  @ApiProperty({ example: '100001' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 6.5244 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 3.3792 })
  @IsNumber()
  longitude: number;
}

export class AdditionalDetailsDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  parkingSpaces?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  petsAllowed?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  smokingAllowed?: boolean;

  @ApiPropertyOptional({ example: 1200 })
  @IsOptional()
  @IsNumber()
  floorArea?: number;

  @ApiPropertyOptional({ example: 2018 })
  @IsOptional()
  @IsNumber()
  yearBuilt?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  numberOfFloors?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsNumber()
  numberOfBedrooms?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  numberOfBathrooms?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isFurnished?: boolean;
}

export class MortgageTermsDto {
  @ApiProperty({ example: 20, description: 'Minimum down payment (%)' })
  @IsNumber()
  minimumDownPayment: number;

  @ApiProperty({ example: 18, description: 'Annual interest rate (%)' })
  @IsNumber()
  interestRate: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  durationInYears: number;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  estimatedMonthlyPayment: number;
}
export class DetailsDto {
  @ApiProperty({ enum: ListingType })
  @IsEnum(ListingType)
  kind: ListingType;
}
export class RentDetailsDto extends DetailsDto {
  @ApiProperty({ example: 750000, description: 'Monthly rent amount' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: '2026-02-01' })
  @IsDateString()
  availableFrom: Date;

  @ApiPropertyOptional({ example: '2027-02-01' })
  @IsOptional()
  @IsDateString()
  availableTo?: Date;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  @IsNumber()
  minimumStayInMonths?: number;

  @ApiPropertyOptional({ example: 150000 })
  @IsOptional()
  @IsNumber()
  securityDeposit?: number;
}

export class SaleDetailsDto extends DetailsDto {
  @ApiProperty({ example: 45000000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  allowsMortgage: boolean;

  @ApiPropertyOptional({ type: MortgageTermsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => MortgageTermsDto)
  mortgageTerms?: MortgageTermsDto;
}

/* -------------------- Main DTO -------------------- */

@ApiExtraModels(RentDetailsDto, SaleDetailsDto)
export class CreatePropertyDto {
  @ApiProperty({ example: 'Luxury 4 Bedroom Duplex' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'A well-finished 4-bedroom duplex in Lekki',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiPropertyOptional({
    example: ['luxury', 'lekki', 'new'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: ['https://cdn.site.com/img1.jpg', 'https://cdn.site.com/img2.jpg'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiPropertyOptional({ type: AdditionalDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AdditionalDetailsDto)
  additionalDetails?: AdditionalDetailsDto;

  @ApiPropertyOptional({
    enum: Amenity,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Amenity, { each: true })
  amenities?: Amenity[];

  @ApiProperty({
    enum: ListingType,
    example: ListingType.SALE,
  })
  @IsEnum(ListingType)
  listingType: ListingType;

  @ApiProperty({
    description: 'Either rentDetails or saleDetails depending on listingType',
    oneOf: [
      { $ref: getSchemaPath(RentDetailsDto) },
      { $ref: getSchemaPath(SaleDetailsDto) },
    ],
    discriminator: {
      propertyName: 'kind',
      mapping: {
        rent: getSchemaPath(RentDetailsDto),
        sale: getSchemaPath(SaleDetailsDto),
      },
    },
  })
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: 'kind',
      subTypes: [
        { name: ListingType.RENT, value: RentDetailsDto },
        { name: ListingType.SALE, value: SaleDetailsDto },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  propertyDetails: RentDetailsDto | SaleDetailsDto;
}
