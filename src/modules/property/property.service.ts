import { Injectable } from '@nestjs/common';

import * as dto from './dto';
@Injectable()
export class PropertyService {
  create(dto: dto.CreatePropertyDto) {
    return dto;
  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: string) {
    return `This action returns a #${id} property`;
  }

  update(id: string, dto: dto.UpdatePropertyDto) {
    return dto;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
