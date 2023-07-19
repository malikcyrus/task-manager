import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  userId: string; 
  description: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ITask>('Task', TaskSchema);
