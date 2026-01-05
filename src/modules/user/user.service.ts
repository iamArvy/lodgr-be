import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { USER_MESSAGES } from './constants';
import * as dto from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: dto.CreateUserDto) {
    return this.userRepository.create({
      createPayload: createUserDto,
      transactionOptions: { useTransaction: false },
    });
  }

  async findAll() {
    const { payload, paginationMeta } = await this.userRepository.list({
      paginationPayload: { page: 1, limit: 100 },
      filterRecordOptions: { is_deleted: false },
    });
    const items = plainToInstance(dto.UserDto, payload);
    return {
      message: USER_MESSAGES.listed,
      data: items,
      meta: paginationMeta,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.get({ identifierOptions: { id } });
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.notFound);
    }
    return user;
  }

  async update(id: string, updateUserDto: dto.UpdateUserDto) {
    await this.userRepository.update({
      identifierOptions: { id },
      updatePayload: updateUserDto,
      transactionOptions: { useTransaction: false },
    });
    return { message: USER_MESSAGES.updated };
  }

  async remove(id: string) {
    await this.userRepository.update({
      identifierOptions: { id },
      updatePayload: { deleted_at: new Date() },
      transactionOptions: { useTransaction: false },
    });
    return { message: USER_MESSAGES.deleted };
  }
}
