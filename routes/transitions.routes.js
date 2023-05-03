const { compare } = require('bcrypt')
const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');
const db = require('../sql/knex');

const { Router } = require("express");
const transitionsRoutes = Router();

const transitionsController = require('../controllers/transitionsController');
const AppError = require('../utils/AppError');
const TransitionsController = new transitionsController; 


const verificarDados = (req, res, next) =>{
    const { deposit } = req.body;
    const { password } = req.headers;

    const errors = [];

    if(!deposit){
        errors.push("O valor do deposito nao foi informado")
    }

    if(deposit<=0){
        errors.push("valor do deposito invalido");
    }

    if(!password){
        errors.push("A senha nao foi informada");
    }

    if(errors.length!==0){
        throw new AppError(errors, 401);
    }

    next()
}
const NotAutheticPassword = async (req, res, next) =>{
    
    const { id } = req.user;
    const { password } = req.headers;

    const user = await dbUsers.getUserById({id: id});
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        throw new AppError("Senha digitada esta errada");
    }

    next();
}

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


const validarKey = async(req, res, next) =>{
    const { keypix } = req.body;

    const user = await db('users').where("keypix", keypix).first();
    if(!user){
        throw new AppError("A Chave pix e invalida");
    }

    next()
}


transitionsRoutes.patch('/deposit', garantirAuth, NotAutheticPassword, verificarDados, TransitionsController.deposit);
transitionsRoutes.patch('/withdraw', garantirAuth, NotAutheticPassword, TransitionsController.withdraw);
transitionsRoutes.patch('/transition', garantirAuth, NotAutheticPassword, validarKey, TransitionsController.transaction);
transitionsRoutes.get('/extracts', garantirAuth, validarDate, TransitionsController.extract);
module.exports = transitionsRoutes;