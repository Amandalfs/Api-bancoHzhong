import'express-async-errors';

import express, { NextFunction, Request, Response} from "express";
import cors  from "cors";
import { routes } from "./main/routes";

import { AppError } from './utils/errors/AppError';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error, req: Request, res: Response, next: NextFunction)=>{
    if(error instanceof AppError || AppError.prototype.isPrototypeOf(error)){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);
    
    return res.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})

export { app };