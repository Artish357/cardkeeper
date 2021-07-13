// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, _next) {
    const code = err.statusCode || 500
    const message = err.message || "Unexpected error occurred"
    res.status(code).json({
        status: 'error',
        message: message
    })
}

export default errorMiddleware;