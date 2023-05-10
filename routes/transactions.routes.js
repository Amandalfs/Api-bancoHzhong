const garantirAuth = require('../middlewares/garantirAuth');

const { Router } = require("express");
const transactionsRoutes = Router();

const AppError = require('../utils/AppError');

const depositTransactionsController = require('../module/transactions/useCase/DepositTransactions');
const withdrawTransactionsController = require('../module/transactions/useCase/WithdrawTransactions');
const sendingMoneyController = require('../module/transactions/useCase/SendingMoney');
const extractsByDataController = require('../module/transactions/useCase/ExtractsByData');

const validarDate = (req, res, next) =>{
    const {dateInicial, dateFinal} = req.body   

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
       throw new AppError(errors, 401);
    }

    next();
}


transactionsRoutes.patch('/deposit', garantirAuth, (req, res)=>{
    return depositTransactionsController.handle(req, res);
});

transactionsRoutes.patch('/withdraw', garantirAuth, (req, res)=>{
    return withdrawTransactionsController.handle(req, res);
});

transactionsRoutes.patch('/sendingMoney', garantirAuth, (req, res)=>{
    return sendingMoneyController.handle(req, res);
});

transactionsRoutes.get('/extracts', garantirAuth, validarDate, (req, res)=>{
    return extractsByDataController.handle(req, res);
});

module.exports = transactionsRoutes;