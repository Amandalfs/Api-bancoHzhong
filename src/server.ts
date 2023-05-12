require('express-async-errors');

import express, { NextFunction, Request, Response} from "express";
import cors  from "cors";
import { routes } from "./routes";

import { AppError } from './utils/AppError';

const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error, req: Request, res: Response, next: NextFunction)=>{
    if(error instanceof AppError){
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

app.listen(port, () => console.log(`Tudo ok, porta ${port}`));