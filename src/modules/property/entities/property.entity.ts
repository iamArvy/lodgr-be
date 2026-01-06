import { SoftDeleteEntity } from 'src/database/entities';
import { Column } from 'typeorm';

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  LAND = 'land',
  COMMERCIAL = 'commercial',
  RESIDENTIAL = 'residential',
  INDUSTRIAL = 'industrial',
}

export enum Amenity {
  WIFI = 'wifi',
  PARKING = 'parking',
  POOL = 'pool',
  GYM = 'gym',
  AIR_CONDITIONING = 'air_conditioning',
  HEATING = 'heating',
  PET_FRIENDLY = 'pet_friendly',
  LAUNDRY = 'laundry',
  ELEVATOR = 'elevator',
  SECURITY = 'security',
}

export interface IPropertyDetails {
  key: string;
  value: string | number | boolean;
}

export class Property extends SoftDeleteEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: PropertyType, default: PropertyType.HOUSE })
  propertyType: PropertyType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({ type: 'jsonb' })
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ type: 'simple-array' })
  amenities: string[];

  @Column({ type: 'date' })
  availableFrom: Date;

  @Column({ type: 'date', nullable: true })
  availableTo: Date | null;

  @Column({ type: 'boolean', default: false })
  isFurnished: boolean;

  @Column({ type: 'jsonb', nullable: true })
  additionalDetails: {
    parkingSpaces: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    floorArea: number; // in square feet
    yearBuilt: number;
    numberOfFloors: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    isFurnished: boolean;
  };
}
