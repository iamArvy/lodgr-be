import { PaginationMeta } from '@hng-sdk/orm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import {
  ApiListResponseDto,
  ApiResponseDto,
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

export class UserResponse extends ApiResponseDto {
  @ApiProperty({ type: UserDto })
  data: UserDto;

  constructor(message: string, data: UserDto) {
    super();
    Object.assign(this, { message, data: new UserDto(data) });
  }
}

export class ListUserResponse extends ApiListResponseDto {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];

  constructor(message: string, data: UserDto[], meta: Partial<PaginationMeta>) {
    super();
    Object.assign(this, {
      message,
      data: plainToInstance(UserDto, data),
      meta,
    });
  }
}
