import { Test, TestingModule } from '@nestjs/testing';

import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';

const mockPropertyRepository = {
  list: jest.fn(),
  create: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
};

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: PropertyRepository,
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
