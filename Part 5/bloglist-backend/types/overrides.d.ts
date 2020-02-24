declare namespace Express {
    export interface Request {
        token?: {
            id: string,
            username: string
        };
    }
}