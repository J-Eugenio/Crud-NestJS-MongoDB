import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return this.userModel.find().exec();
  }

  async getById(id: string) {
    try {
      return await this.userModel.findById(id).exec();
    } catch {
      return 0;
    }
  }

  async create(user: User) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async update(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
