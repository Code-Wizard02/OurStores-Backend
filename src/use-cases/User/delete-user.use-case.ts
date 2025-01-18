import { UserRepository } from "domain/repositories/user.repository";
import { User } from "domain/entities/user.entity";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute (userId: string): Promise<User> {
        const deletedUser = await this.userRepository.deleteById(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    }
}