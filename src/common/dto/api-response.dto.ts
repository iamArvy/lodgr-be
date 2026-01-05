import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function createApiResponseDto<T>(dataType: Type<T>) {
  class ApiResponseDto {
    @ApiProperty({ example: 200 })
    status_code: number;

    @ApiProperty({ nullable: true })
    message: string;

    @ApiProperty({ type: dataType, nullable: true })
    data: T | null;
  }
  return ApiResponseDto;
}

export function createApiArrayResponseDto<T>(dataType: Type<T>) {
  class ApiArrayResponseDto {
    @ApiProperty({ example: 200 })
    status_code: number;

    @ApiProperty({ nullable: true })
    message: string | null;

    @ApiProperty({ type: [dataType], nullable: true })
    data: T[] | null;
  }
  return ApiArrayResponseDto;
}
export function createApiPaginatedResponseDto<T>(dataType: Type<T>) {
  class PaginationMetaDto {
    @ApiProperty({ example: 0 })
    total: number;

    @ApiProperty({ example: 0 })
    limit?: number;

    @ApiProperty({ example: 0 })
    page?: number;

    @ApiProperty({ example: 0 })
    total_pages?: number;

    @ApiProperty({ example: true })
    has_next?: boolean;

    @ApiProperty({ example: false })
    has_prev?: boolean;
  }
  class ApiPaginatedResponseDto {
    @ApiProperty({ example: 200 })
    status_code: number;

    @ApiProperty({ nullable: true })
    message: string | null;

    @ApiProperty({ type: [dataType] })
    data: T[];

    @ApiProperty({ type: PaginationMetaDto })
    meta: PaginationMetaDto;
  }
  return ApiPaginatedResponseDto;
}
