import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    next(error);

}