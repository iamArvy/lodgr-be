import { SoftDeleteEntity } from 'src/database/entities';
import { Entity, Column } from 'typeorm';

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

export enum ListingType {
  RENT = 'rent',
  SALE = 'sale',
}

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface IAdditionalDetails {
  parkingSpaces?: number;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  floorArea?: number; // square feet
  yearBuilt?: number;
  numberOfFloors?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  isFurnished?: boolean;
}

export interface IMortgageTerms {
  minimumDownPayment: number; // %
  interestRate: number; // %
  durationInYears: number;
  estimatedMonthlyPayment: number;
}

export interface IPropertyDetails {
  kind: ListingType;
}
export interface IRentDetails extends IPropertyDetails {
  price: number; // monthly rent
  availableFrom: Date;
  availableTo?: Date;
  minimumStayInMonths?: number;
  securityDeposit?: number;
}

export interface ISaleDetails extends IPropertyDetails {
  price: number;
  allowsMortgage: boolean;
  mortgageTerms?: {
    minimumDownPayment: number; // %
    interestRate: number; // %
    durationInYears: number;
    estimatedMonthlyPayment: number;
  };
}

@Entity('properties')
export class Property extends SoftDeleteEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'property_type',
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.HOUSE,
  })
  propertyType: PropertyType;

  @Column({ type: 'simple-array', default: '' })
  tags: string[];

  @Column({ type: 'simple-array', default: '' })
  images: string[];

  @Column({ type: 'jsonb' })
  location: ILocation;

  @Column({ name: 'additional_details', type: 'jsonb', nullable: true })
  additionalDetails?: IAdditionalDetails;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: string;

  @Column({ name: 'reviews_count', type: 'int', default: 0 })
  reviewsCount: number;

  @Column({
    type: 'enum',
    enum: Amenity,
    array: true,
    default: [],
  })
  amenities: Amenity[];

  @Column({
    name: 'listing_type',
    type: 'enum',
    enum: ListingType,
    default: ListingType.SALE,
  })
  listingType: ListingType;

  @Column({ name: 'property_details', type: 'jsonb' })
  propertyDetails: IRentDetails | ISaleDetails;
}
