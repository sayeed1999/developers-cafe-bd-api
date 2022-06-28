const jwt = require('jsonwebtoken');
const User = require('../../models/Person.model');

// middleware to set user object if jwt token present in header
const setCurrentUser = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(' ')[1];
            let decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return next();
            // return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
        // const user = await User.findOne({ _id: decoded.userid });
        const user = {
            userid: decoded.userid,
            username: decoded.username,
            email: decoded.email,
        };
        req.user = user;
    }
    next();
};

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
    setCurrentUser,
    requireRole,
};
