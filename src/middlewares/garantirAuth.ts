import { NextFunction, Request, Response } from "express";

import { verify } from 'jsonwebtoken';
import {AuthConfig} from '../config/auth';
import { AppError } from "../utils/errors/AppError";
import { TokenNotSentError } from "./errors/TokenNotSentError";

function garantirAuth(req: Request, res: Response, next:NextFunction){
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    

    if(!authToken){
        throw new TokenNotSentError();
    }

    try {
        const { sub: user_id} = verify(authToken, AuthConfig.jwt.secret)
        
        req.user = {
            id: Number(user_id)
        }

    } catch (error) {
        throw new AppError(error.message, 401);
    }

    return next()
}

export default garantirAuth;