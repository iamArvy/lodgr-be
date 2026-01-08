import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

import { USER_MESSAGES } from './constants';
import * as dto from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: dto.CreateUserDto) {
    const user = await this.userRepository.create({
      createPayload: createUserDto,
      transactionOptions: { useTransaction: false },
    });
    return new dto.UserResponse(USER_MESSAGES.created, user);
  }

  async findAll() {
    const { payload, paginationMeta } = await this.userRepository.list({
      paginationPayload: { page: 1, limit: 100 },
      filterRecordOptions: { is_deleted: false },
    });
    const items = plainToInstance(dto.UserDto, payload);
    return new dto.ListUserResponse(
      USER_MESSAGES.listed,
      items,
      paginationMeta,
    );
  }

  async findOne(id: string) {
    const user = await this.userRepository.get({ identifierOptions: { id } });
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.notFound);
    }
    return new dto.UserResponse(USER_MESSAGES.found, user);
  }

  async update(id: string, updateUserDto: dto.UpdateUserDto) {
    await this.userRepository.update({
      identifierOptions: { id },
      updatePayload: updateUserDto,
      transactionOptions: { useTransaction: false },
    });
    return new ApiResponseDto(USER_MESSAGES.updated);
  }

  async remove(id: string) {
    await this.userRepository.update({
      identifierOptions: { id },
      updatePayload: { deleted_at: new Date() },
      transactionOptions: { useTransaction: false },
    });
    return new ApiResponseDto(USER_MESSAGES.deleted);
  }
}
