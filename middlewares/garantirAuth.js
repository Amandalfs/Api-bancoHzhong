const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth');
const AppError = require('../utils/AppError');

function garantirAuth(req, res, next){
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    

    if(!authToken){
        throw new AppError("Token nao foi recebido");
    }

    try {
        const { sub: user_id} = verify(authToken, authConfig.jwt.secret)
        
        req.user = {
            id: Number(user_id)
        }

    } catch (error) {
        throw new AppError(error, 401);
    }

    return next()
}

module.exports = garantirAuth;