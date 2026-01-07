import { AbstractModelAction } from '@hng-sdk/orm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities';

@Injectable()
export class PropertyRepository extends AbstractModelAction<Property> {
  constructor(
    @InjectRepository(Property)
    propertyRepository: Repository<Property>,
  ) {
    super(propertyRepository, Property);
  }
}
