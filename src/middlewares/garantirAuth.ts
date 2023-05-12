import { NextFunction, Request, Response } from "express";

import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { AppError } from "../utils/AppError";

function garantirAuth(req: Request, res: Response, next:NextFunction){
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
        throw new AppError(error.message, 401);
    }

    return next()
}

export default garantirAuth;