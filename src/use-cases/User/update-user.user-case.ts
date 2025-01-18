import { UserRepository } from "domain/repositories/user.repository";
import { User } from "domain/entities/user.entity";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute (userId: string, user: User): Promise<User> {
        const updatedUser = await this.userRepository.update(userId, user);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }
}