const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-err');

const handleAuthError = () => {
    throw new UnauthorizedError('Unauthorized Error: 401');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return handleAuthError(res);
    }

    const token = extractBearerToken(authorization);
    let payload;

    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return handleAuthError(res);
    }

    req.user = payload; // adding the payload to the Request object

    return next(); // passing the request further along
};