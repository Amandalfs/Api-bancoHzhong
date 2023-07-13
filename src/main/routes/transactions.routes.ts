import garantirAuth from "../../middlewares/garantirAuth";

import { Request, Response, Router } from "express";
const transactionsRoutes = Router();

import withdrawTransactionsController from '../../domain/module/transactions/useCase/WithdrawTransactions';
import sendingMoneyController from '../../domain/module/transactions/useCase/SendingMoney';
import extractsByDataController from '../../domain/module/transactions/useCase/ExtractsByData';

import { makeDepositTransactionsController } from "../controllers/factores/makeTransactions/makeDepositTransactionsControlller";

import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";
const controllerAdapterExpress = new ControllerAdapterExpress();

transactionsRoutes.patch('/deposit', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeDepositTransactionsController();
    return controllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.patch('/withdraw', garantirAuth, (req: Request, res: Response)=>{
    return withdrawTransactionsController.handle(req, res);
});

transactionsRoutes.patch('/sendingMoney', garantirAuth, (req: Request, res: Response)=>{
    return sendingMoneyController.handle(req, res);
});

transactionsRoutes.get('/extracts', garantirAuth, (req: Request, res: Response)=>{
    return extractsByDataController.handle(req, res);
});

export { transactionsRoutes };