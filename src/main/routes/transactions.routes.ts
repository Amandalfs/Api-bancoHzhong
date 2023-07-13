import garantirAuth from "../../middlewares/garantirAuth";

import { Request, Response, Router } from "express";
const transactionsRoutes = Router();


import { makeDepositTransactionsController } from "../controllers/factores/makeTransactions/makeDepositTransactionsControlller";
import { makeWithdrawTransactionsController } from "../controllers/factores/makeTransactions/makeWithdrawTransactionsController";
import { makeSendingMoneyTransactionsController } from "../controllers/factores/makeTransactions/makeSendingMoneyTransactionsController";
import { makeExtractByDateTransactionsController } from "../controllers/factores/makeTransactions/makeExtractByDateTransactionsController";

import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";
const controllerAdapterExpress = new ControllerAdapterExpress();

transactionsRoutes.patch('/deposit', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeDepositTransactionsController();
    return controllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.patch('/withdraw', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeWithdrawTransactionsController();
    return controllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.patch('/sendingMoney', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeSendingMoneyTransactionsController();
    return controllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.get('/extracts', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeExtractByDateTransactionsController();
    return controllerAdapterExpress.handle(req, res, controller);
});

export { transactionsRoutes };