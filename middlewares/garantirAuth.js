const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth');

function garantirAuth(req, res, next){
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    

    if(!authToken){
        return res.status(401).send("token nao foi recebido")
    }

    try {
        const { sub: user_id} = verify(authToken, authConfig.jwt.secret)
        
        req.user = {
            id: Number(user_id)
        }

    } catch (error) {
        return res.status(401).send(error)
    }

    return next()
}

module.exports = garantirAuth;