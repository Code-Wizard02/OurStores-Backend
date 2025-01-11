import { Request, Response } from "express";
import { MongoUserRepository } from "../../persistence/mongo-user.repository";
import { LoginUseCase } from "../../../use-cases/Auth/login.use-case";
import { SignupUseCase } from "../../../use-cases/Auth/signup.use-case";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = new MongoUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    try {
      const token = await loginUseCase.execute(email, password);
      res.status(200).json({
        message: "Usuario logueado con éxito",
        token,
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async signup(req: Request, res: Response) {
    const userRepository = new MongoUserRepository();
    const signupUseCase = new SignupUseCase(userRepository);

    try {
      const user = await signupUseCase.execute(req.body);
      res.status(201).json({
        message: "Usuario creado con éxito",
        user,
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
