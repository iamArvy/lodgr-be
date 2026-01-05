import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  createApiPaginatedResponseDto,
  createApiResponseDto,
} from 'src/common/dto/api-response.dto';

import { User } from '../entities';

@Exclude()
export class UserDto implements Partial<User> {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ name: 'email' })
  @Expose()
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserResponse = createApiResponseDto(UserDto);

export const ListUserResponse = createApiPaginatedResponseDto(UserDto);
