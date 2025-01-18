import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import UserModel from '../database/models/user.model';

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async findByEmailOrPhone(email?: string, phoneNumber?: string): Promise<User | null> {
    return await UserModel.findOne({email});
  }

  async findAll(): Promise<User[]> {
    return await UserModel.find();
  }

  async update(id:string, user: User): Promise<User> {
    await UserModel.updateOne({ _id: id }, user);
    return user;
  }

  async deleteById(id: string): Promise<void> {
    await UserModel.deleteOne({ _id: id });
  }
}
