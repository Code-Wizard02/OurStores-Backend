import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AuthService } from "../../domain/services/auth.service";
import bcrypt from "bcrypt";

export class SignupUseCase{
    constructor(private userRepository: UserRepository) {}

    async execute(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
            throw new Error("Password is required");
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const authService = new AuthService(this.userRepository);
        return await authService.signup(userData);
    }
}