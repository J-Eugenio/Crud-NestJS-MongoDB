import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './task';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAll() {
    return await this.taskModel.find().exec();
  }

  async getById(id: string) {
    try {
      return await this.taskModel.findById(id).exec();
    } catch {
      return 0;
    }
  }

  async create(task: Task) {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async update(id: string, task: Task) {
    try {
      await this.taskModel.updateOne({ _id: id }, task).exec();
      return this.getById(id);
    } catch {
      throw new HttpException('ID not found!!', HttpStatus.NO_CONTENT);
    }
  }

  async delete(id: string) {
    try {
      return this.taskModel.findByIdAndDelete(id);
    } catch {
      throw new HttpException('ID not found!!', HttpStatus.NO_CONTENT);
    }
  }
}
