const db = require('../sql/knex/index');
const { compare } = require('bcrypt');

const { Router } = require("express");
const usersRoutes = Router();

const garantirAuth = require('../middlewares/garantirAuth');

const AppError = require('../utils/AppError');
const validarCPF = require('../middlewares/validarCpf')


const verificarSenhaCreate = (req, res, next)=>{
    const {password2, password } = req.headers;

    if(password !== password2){
        console.log(password, password2)
        throw new AppError("Senhas Diferentes");
    }
    
    next()
}

const isEmailUsernameCpfCreate = async (req, res, next)=>{
    const db = require('../sql/knex/index')

    const { email, username} = req.body;
    const { cpf } = req.headers;
    const errors = [];

    const isEmail = await db('users').where("email", email).select()
    const isUsername = await db('users').where("username", username).select()
    const isCpf = await db('users').where("cpf", cpf).select()

    if(isEmail.length!==0){
        errors.push("Ja existente uma conta com esse Email")
    }

    if(isUsername.length!==0){
        errors.push("Ja existente uma conta com esse CPF")
    }

    if(isCpf.length!==0){
        errors.push("Ja existente uma conta com esse Username")
    }

    if(errors.length!==0){
        throw new AppError(errors, 401);
    }

    next();
}

const createUserController = require('../module/acconts/useCase/CreateUser');

const usersController = require('../controllers/usersController');
const UsersController = new usersController;

usersRoutes.get('/', UsersController.login);

usersRoutes.post('/', validarCPF, verificarSenhaCreate, isEmailUsernameCpfCreate, (req, res)=>{
    return createUserController.handle(req, res);
});
usersRoutes.get('/show', garantirAuth, UsersController.show);

module.exports = usersRoutes;
