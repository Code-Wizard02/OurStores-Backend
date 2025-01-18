import { HttpRequest, HttpResponse } from "infrastructure/http/interfaces/interfaces.http";

export class LogOutUseCase {
    async execute(req: HttpRequest, res: HttpResponse) {
        if (!req.cookies) {
            console.error("Error: req.cookies is undefined. Asegúrate de que el middleware de cookies esté configurado.");
            return {
                message: "No hay sesion activa para desloguear",
                success: false
            };
        }

        const authToken = req.cookies.authToken;
        if (!authToken) {
            console.error("Error: authToken is undefined. Asegúrate de que el middleware de cookies esté configurado.");
            return {
                message: "No hay sesion activa para desloguear",
                success: false
            };
        }

        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        return {
            message: "Usuario deslogueado con éxito",
            success: true
        };
    }
}