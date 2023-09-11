import { Request, Response, Router } from "express";
const transactionsRoutes = Router();


import { makeDepositTransactionsController } from "../controllers/factores/makeTransactions/makeDepositTransactionsControlller";
import { makeWithdrawTransactionsController } from "../controllers/factores/makeTransactions/makeWithdrawTransactionsController";
import { makeSendingMoneyTransactionsController } from "../controllers/factores/makeTransactions/makeSendingMoneyTransactionsController";
import { makeExtractByDateTransactionsController } from "../controllers/factores/makeTransactions/makeExtractByDateTransactionsController";

import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";
import { makeGraficExtractsPizza } from "../controllers/factores/makeTransactions/makeGraficExtractsPizza";
import { makeGraficExtractsDayByColumnController } from "../controllers/factores/makeTransactions/makeGraficExtractsDayByColumnController";

transactionsRoutes.patch('/deposit', (req: Request, res: Response)=>{
    const controller = makeDepositTransactionsController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.patch('/withdraw', (req: Request, res: Response)=>{
    const controller = makeWithdrawTransactionsController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.patch('/sendingMoney', (req: Request, res: Response)=>{
    const controller = makeSendingMoneyTransactionsController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.get('/extracts', (req: Request, res: Response)=>{
    const controller = makeExtractByDateTransactionsController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.get('/grafic/pizza', (req: Request, res: Response)=>{
    const controller = makeGraficExtractsPizza();
    return ControllerAdapterExpress.handle(req, res, controller);
});

transactionsRoutes.get('/grafic/column-day', (req: Request, res: Response)=>{
    const controller = makeGraficExtractsDayByColumnController();
    return ControllerAdapterExpress.handle(req, res, controller);
})

export { transactionsRoutes };