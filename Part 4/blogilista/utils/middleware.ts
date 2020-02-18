import { JWT_SECRET } from "./config";

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Token } from "../types/token";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    next(error);

}

export const tokenExtractor = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const getRequestToken = (request: Request) => {
        const auth = request.get("authorization");
        return auth && auth.toLowerCase().startsWith("bearer")
            ? auth.substring(7)
            : null;
    };

    const token = getRequestToken(req);

    const decodedToken = jwt.verify(token, JWT_SECRET) as Token;
    if (!token || !decodedToken.id)
        return res.status(401).json({ error: "token missing or invalid" });

    req.token = decodedToken;

    next(req);

}