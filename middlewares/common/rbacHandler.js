const jwt = require('jsonwebtoken');
const User = require('../../models/Person.model');

// // middleware to set user object if jwt token present in header
// const jwtUnboxer = async (req, res, next) => {
//     if (req.headers && req.headers.authorization) {
//         const authorization = req.headers.authorization.split(' ')[1];
//             let decoded;
//         try {
//             decoded = jwt.verify(authorization, process.env.JWT_SECRET);
//         } catch (e) {
//             return res.status(401).send('unauthorized');
//         }
//         const userId = decoded.id;
//         // Fetch the user by id
//         const user = await User.findOne({ _id: userId });
//         req.user = user;
//         return next(req);
//     }
//     next();
// };

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
    // jwtUnboxer,
    requireRole,
};
