import mongoose, { Schema } from 'mongoose';
import { User } from '../../../domain/entities/user.entity';

const UserSchema = new Schema<User>({
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  lastName: { type: String },
  profilePictureUrl: { type: String },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export default mongoose.model<User>('User', UserSchema);
