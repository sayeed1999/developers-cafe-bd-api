"use strict";
const createError = require('http-errors');
// 404 route not found error handler
const routeNotFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested route was not found!'));
};
// default error handler
const errorHandler = (err, req, res, next) => {
    // override what you want
    console.log('===> Error: ', err.message);
    res.status(400).json({
        error: err,
    });
};
module.exports = {
    routeNotFoundHandler,
    errorHandler,
};
module.exports = {};
//# sourceMappingURL=errorHandler.js.map