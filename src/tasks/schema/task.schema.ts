import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  descrioption: String,
  completed: Boolean,
});
