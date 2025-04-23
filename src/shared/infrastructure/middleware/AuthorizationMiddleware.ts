import { NextFunction, Request, Response } from "express";
import { UnauthoeizationException } from "../../domain/exceptions/UnauthorizationException";
import { JwtService } from "../jwt-auth/JwtService";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const AuthorizationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorizationHeader = req.headers['authorization'] as string;

    if (!authorizationHeader) {
        res.status(400).json({ error: 'Invalid Authorization format' });
    }
    const parts = authorizationHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(400).json({ error: 'Invalid Authorization format' });
    }
    const token = parts[1];
    try {
        const decoded = JwtService.verify(token);
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};