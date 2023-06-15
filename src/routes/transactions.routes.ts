import garantirAuth from "../middlewares/garantirAuth";

import { NextFunction, Request, Response, Router } from "express";
const transactionsRoutes = Router();

import { AppError } from "../utils/errors/AppError";

import depositTransactionsController from '../module/transactions/useCase/DepositTransactions';
import withdrawTransactionsController from '../module/transactions/useCase/WithdrawTransactions';
import sendingMoneyController from '../module/transactions/useCase/SendingMoney';
import extractsByDataController from '../module/transactions/useCase/ExtractsByData';

const validarDate = (req: Request, res: Response, next: NextFunction) =>{
    const {dateInicial, dateFinal} = req.query;

    let pattern = /^\d{4}-\d{2}$-\d{2}/;
    

    const errors = [];

    if(!dateInicial){
        errors.push("Preencha a data inicial")
    }

    if(!dateFinal){
        errors.push("Preencha a data final")
    }

    if(pattern.test(dateInicial) || !isNaN(dateInicial)){
        errors.push("Data Inicial invalida")
    }

    if(pattern.test(dateFinal) || !isNaN(dateFinal)){
        errors.push("Data Final invalida")
    }

    if(errors.length!==0){
       throw new AppError(errors[0], 401);
    }

    next();
}


transactionsRoutes.patch('/deposit', garantirAuth, (req: Request, res: Response)=>{
    return depositTransactionsController.handle(req, res);
});

transactionsRoutes.patch('/withdraw', garantirAuth, (req: Request, res: Response)=>{
    return withdrawTransactionsController.handle(req, res);
});

transactionsRoutes.patch('/sendingMoney', garantirAuth, (req: Request, res: Response)=>{
    return sendingMoneyController.handle(req, res);
});

transactionsRoutes.get('/extracts', garantirAuth, validarDate, (req: Request, res: Response)=>{
    return extractsByDataController.handle(req, res);
});

export { transactionsRoutes };