import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
