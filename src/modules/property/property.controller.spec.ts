import { Test, TestingModule } from '@nestjs/testing';

import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';

const mockPropertyRepository = {
  list: jest.fn(),
  create: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
};

describe('PropertyController', () => {
  let controller: PropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        PropertyService,
        { provide: PropertyRepository, useValue: mockPropertyRepository },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
