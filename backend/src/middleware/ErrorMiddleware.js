import ServerError from "../ServerError";
import { NextFunction, Response, Request } from "express";

function errorMiddleware(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    })
}

export default errorMiddleware;