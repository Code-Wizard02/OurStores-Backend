import { User } from "domain/entities/user.entity";
import { UserRepository } from "domain/repositories/user.repository";

export class AuthService{
    constructor (private userRepository: UserRepository) {}

    async signup(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
            throw new Error("Password is required");
        }

        const existingUser = await this.userRepository.findByEmailOrPhone(
            userData.email,
            userData.phoneNumber
        );
        if (existingUser) {
            throw new Error("The user already exists");
        }

        const newUser: User = {
            ...userData,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as User;

        return await this.userRepository.create(newUser);
    }

    async login(userData: Partial<User>): Promise<User> {
        if (!userData.email && !userData.phoneNumber) {
            throw new Error("You must provide an email or a phone number");
        }

        const user = await this.userRepository.findByEmailOrPhone(
            userData.email,
            userData.phoneNumber
        );
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}