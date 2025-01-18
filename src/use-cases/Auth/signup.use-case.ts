import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import bcrypt from "bcrypt";

export class SignupUseCase{
    constructor(private userRepository: UserRepository) {}

    async execute(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
            throw new Error("Password is required");
        }

        userData.email = userData.email?.trim().toLowerCase();
        userData.name= userData.name?.trim().toLowerCase();
        userData.lastName = userData.lastName?.trim().toLowerCase();


        if (!userData.email || !userData.name || !userData.lastName) {
            throw new Error("Email, name and last name are required");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const existingUser= await this.userRepository.findByEmailOrPhone(userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const newUser= await this.userRepository.create({
            ...userData,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as User);
        return newUser;
    }
}