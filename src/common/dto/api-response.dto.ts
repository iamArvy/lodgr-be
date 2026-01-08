import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty({ example: 200 })
  status_code: number;

  @ApiProperty({ type: String, nullable: true })
  message: string | null;

  constructor(message?: string) {
    this.message = message ?? null;
  }
}

export class PaginationMetaDto {
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

export class ApiListResponseDto extends ApiResponseDto {
  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
