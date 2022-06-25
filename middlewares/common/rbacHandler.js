// auth guard to protect routes that need authentication
const requireRole = (role) => (req, res, next) => {
    if (req.user.role && role.includes(req.user.role)) {
        next();
    } else {
        res.status(401).json({
            errors: {
                message: 'You are not authorized!',
            },
        });
    }
};

module.exports = {
    requireRole,
};
