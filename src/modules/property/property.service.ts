import { Injectable, BadRequestException } from '@nestjs/common';

import { PROPERTY_MESSAGES } from './constants';
import * as dto from './dto';
import { ListingType } from './entities';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  create(dto: dto.CreatePropertyDto) {
    if (dto.listingType !== dto.propertyDetails.kind) {
      throw new BadRequestException(PROPERTY_MESSAGES.invalidPropertyDetails);
    }

    if (dto.propertyDetails.kind === ListingType.SALE) {
      const saleDetails = dto.propertyDetails as dto.SaleDetailsDto;

      if (saleDetails.allowsMortgage && !saleDetails.mortgageTerms) {
        throw new BadRequestException(PROPERTY_MESSAGES.mortgageTermsRequired);
      }
    }

    const property = this.propertyRepository.create({
      createPayload: dto,
      transactionOptions: { useTransaction: false },
    });
    return property;
  }

  findAll() {
    return `This action returns all property`;
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.get({
      identifierOptions: { id },
    });
    if (!property) {
      throw new BadRequestException(PROPERTY_MESSAGES.notFound);
    }
    return property;
  }

  update(id: string, dto: dto.UpdatePropertyDto) {
    return dto;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
