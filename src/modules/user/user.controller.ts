import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { USER_CONTROLLER } from './constants';
import * as docs from './docs';
import * as dto from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@docs.UserControllerDocs()
@Controller(USER_CONTROLLER.basePath)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @docs.CreateUserDocs()
  @Post()
  async create(@Body() createUserDto: dto.CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new dto.UserDto(user);
  }

  @docs.ListUserDocs()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @docs.GetUserDocs()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    return new dto.UserDto(user);
  }

  @docs.UpdateUserDocs()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @docs.DeleteUserDocs()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
