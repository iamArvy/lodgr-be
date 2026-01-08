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

import { PROPERTY_CONTROLLER } from './constants';
import * as docs from './docs';
import * as dto from './dto';
import { PropertyService } from './property.service';
@docs.PropertyControllerDocs()
@Controller(PROPERTY_CONTROLLER.basePath)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @docs.CreatePropertyDocs()
  @Post()
  create(@Body() dto: dto.CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @docs.ListPropertyDocs()
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @docs.GetPropertyDocs()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.findOne(id);
  }

  @docs.UpdatePropertyDocs()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: dto.UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, dto);
  }

  @docs.DeletePropertyDocs()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.remove(id);
  }
}
