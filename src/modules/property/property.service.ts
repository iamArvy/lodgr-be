import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PROPERTY_MESSAGES } from './constants';
import * as dto from './dto';
import { ListingType } from './entities';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  private validatePropertyDetails(
    dto: dto.CreatePropertyDto | dto.UpdatePropertyDto,
  ) {
    if (dto.listingType !== dto.propertyDetails?.kind) {
      throw new BadRequestException(PROPERTY_MESSAGES.invalidPropertyDetails);
    }

    if (dto.propertyDetails?.kind === ListingType.SALE) {
      const saleDetails = dto.propertyDetails as dto.SaleDetailsDto;

      if (saleDetails.allowsMortgage && !saleDetails.mortgageTerms) {
        throw new BadRequestException(PROPERTY_MESSAGES.mortgageTermsRequired);
      }
    }
    // Additional validation logic can be added here if needed
  }

  private async getOrThrowProperty(id: string) {
    const property = await this.propertyRepository.get({
      identifierOptions: { id, is_deleted: false },
    });
    if (!property) {
      throw new BadRequestException(PROPERTY_MESSAGES.notFound);
    }
    return property;
  }

  async create(createPropertyDto: dto.CreatePropertyDto) {
    this.validatePropertyDetails(createPropertyDto);
    const property = await this.propertyRepository.create({
      createPayload: createPropertyDto,
      transactionOptions: { useTransaction: false },
    });
    return {
      message: PROPERTY_MESSAGES.created,
      data: new dto.PropertyResponseDto(property),
    };
  }

  async findAll() {
    const { payload, paginationMeta } = await this.propertyRepository.list({
      paginationPayload: { page: 1, limit: 100 },
      filterRecordOptions: { is_deleted: false },
    });
    const properties = plainToInstance(dto.PropertyResponseDto, payload);
    return {
      message: PROPERTY_MESSAGES.listed,
      data: properties,
      meta: paginationMeta,
    };
  }

  async findOne(id: string) {
    const property = await this.getOrThrowProperty(id);
    return {
      message: PROPERTY_MESSAGES.found,
      data: new dto.PropertyResponseDto(property),
    };
  }

  async update(id: string, dto: dto.UpdatePropertyDto) {
    await this.getOrThrowProperty(id);
    this.validatePropertyDetails(dto);

    await this.propertyRepository.update({
      identifierOptions: { id },
      updatePayload: dto,
      transactionOptions: { useTransaction: false },
    });
    return { message: PROPERTY_MESSAGES.updated };
  }

  async remove(id: string) {
    await this.getOrThrowProperty(id);
    await this.propertyRepository.update({
      identifierOptions: { id },
      updatePayload: { is_deleted: true, deleted_at: new Date() },
      transactionOptions: { useTransaction: false },
    });
    return { message: PROPERTY_MESSAGES.deleted };
  }
}
