import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { User } from './shared/user';
import { UserService } from './shared/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | number> {
    const countUsers = await this.userService.getById(id);

    if (countUsers == 0) {
      throw new HttpException('ID not found', HttpStatus.NO_CONTENT);
    }

    return await this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User | number> {
    const countUsers = await this.userService.getById(id);

    if (countUsers == 0) {
      throw new HttpException('ID not found', HttpStatus.NO_CONTENT);
    }

    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    const countUsers = await this.userService.getById(id);

    if (countUsers == 0) {
      throw new HttpException('ID not found', HttpStatus.NO_CONTENT);
    }

    return await this.userService.delete(id);
  }
}
