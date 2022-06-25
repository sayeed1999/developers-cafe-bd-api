const createError = require('http-errors');

// 404 route not found error handler
const routeNotFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested route was not found!'));
};

// default error handler
const errorHandler = (err, req, res, next) => {
    // logger here
    next(err);
};

module.exports = {
    routeNotFoundHandler,
    errorHandler,
};
