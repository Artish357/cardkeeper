import ServerError from "../ServerError";
import { NextFunction, Response, Request } from "express";

function errorMiddleware(err: ServerError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    })
}

export default errorMiddleware;