import { UserRepository } from "domain/repositories/user.repository";
import { User } from "domain/entities/user.entity";

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute (userId: string): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}