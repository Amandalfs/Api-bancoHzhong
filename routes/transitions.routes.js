const garantirAuth = require('../middlewares/garantirAuth');

const { Router } = require("express");
const transitionsRoutes = Router();

const transitionsController = require('../controllers/transitionsController');
const AppError = require('../utils/AppError');

const TransitionsController = new transitionsController; 

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


transitionsRoutes.patch('/deposit', garantirAuth, TransitionsController.deposit);
transitionsRoutes.patch('/withdraw', garantirAuth, TransitionsController.withdraw);
transitionsRoutes.patch('/transition', garantirAuth, TransitionsController.transaction);
transitionsRoutes.get('/extracts', garantirAuth, validarDate, TransitionsController.extract);

module.exports = transitionsRoutes;