import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task | number> {
    const countTasks = await this.taskService.getById(id);

    if (countTasks == 0) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }

    return this.taskService.getById(id);
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() task: Task,
  ): Promise<Task | number> {
    const countTasks = await this.taskService.getById(id);

    if (countTasks == 0) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const countTasks = await this.taskService.getById(id);

    if (countTasks == 0) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    this.taskService.delete(id);
  }
}
