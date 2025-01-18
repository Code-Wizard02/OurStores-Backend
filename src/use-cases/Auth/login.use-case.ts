import { UserRepository } from "domain/repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export class LoginUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute (email: string, password: string) {
        const user = await this.userRepository.findByEmailOrPhone(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
        }
        
        const sessionId = uuidv4();
        const authToken = jwt.sign(
            { userId: user.id, sessionId },
            process.env.JWT_SECRET!
        );

        return {
            user,
            authToken,
        }
    }
}