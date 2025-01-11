import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmailOrPhone(email?: string, phoneNumber?: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
}
