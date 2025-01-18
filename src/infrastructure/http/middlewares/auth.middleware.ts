import { Request, Response, NextFunction } from 'express';

export function cookieParserMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.headers.cookie) {
        req.cookies = req.headers.cookie.split(';').reduce((acc: { [key: string]: string }, cookie: string) => {
            const [key, value] = cookie.split('=');
            acc[key.trim()] = value;
            return acc;
        }, {});
    }
    next();
}