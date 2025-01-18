import { Request, Response } from "express";
import { MongoUserRepository } from "../../persistence/mongo-user.repository";
import { LoginUseCase } from "../../../use-cases/Auth/login.use-case";
import { SignupUseCase } from "../../../use-cases/Auth/signup.use-case";
import { LogOutUseCase } from "../../../use-cases/Auth/logout.use-case";
import { HttpResponse, HttpRequest } from "../interfaces/interfaces.http";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = new MongoUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    try {
      const {user,authToken} = await loginUseCase.execute(email, password);

      res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      res.status(200).json({
        message: "Usuario logueado con éxito",
        authToken,
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
        user:{
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    const logoutUseCase = new LogOutUseCase();

    try {
      const HttpRequest: HttpRequest = {cookies: req.cookies};
      // const HttpResponse: HttpResponse = {clearCookie: res.clearCookie};
      const HttpResponse: HttpResponse = { clearCookie: (name: string, options: any) => res.clearCookie(name, options) };

      const result =  await logoutUseCase.execute(HttpRequest, HttpResponse);

      res.status(200).json(result);
    } catch (error) {
      console.error("LogOut error: ",error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
