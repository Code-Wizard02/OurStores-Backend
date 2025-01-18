import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../../use-cases/User/get-user-by-id.use-case";
import { MongoUserRepository } from "../../persistence/mongo-user.repository";
import bycrypt from "bcrypt";

export class UserController {
    static async getUserById (req: Request, res: Response): Promise<void> {
        const userRepository = new MongoUserRepository();
        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
        try {
            const userId = req.params.id;
            const user = await getUserByIdUseCase.execute(userId);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "Unknown error" });
            }
        }
    }

    static async updateUser (req: Request, res: Response): Promise<void> {
        const userRepository = new MongoUserRepository();
        
        try {
            const userId = req.params.id;
            const editedUser = req.body;

            if (editedUser.password) {
                const hashedPassword = await bycrypt.hash(editedUser.password, 10);
                editedUser.password = hashedPassword;
            }

            const updatedUser = await userRepository.update(userId, editedUser);
            res.status(200).json(updatedUser);


        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(404).json({ message: "Unknown error" });
            }
        }
    }
}
