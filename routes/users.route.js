const db = require('../sql/knex/index');
const { compare } = require('bcrypt');

const { Router } = require("express");
const usersRoutes = Router();

const validarCPF = require('../middlewares/validarCpf')

const verificarDadosLogin = (req, res, next) => {
    const {password} = req.headers;
    const {username} = req.body;

    const errors = [];

    if(!password){
        errors.push("Campo senha nao foi preenchido");
    }

    if(!username){
        errors.push("Campo username nao foi preenchido");
    }

    if(errors.length!==0){
        return res.status(401).send({errors});
    }

    next()
}

const notExistUsernameLogin = async (req, res, next) =>{
    const { username } = req.body;
    const isUsername = await db('users').where("username", username).select()

    if(isUsername.length===0){
        res.status(401).send("O usuario nao possui uma conta")
    }

    next()
}

const NotAutheticPasswordLogin = async (req, res, next) =>{
    
    const {username} = req.body;
    const {password} = req.headers;

    const user = await db('users').where("username", username).select().first();
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digita esta errada")
    }

    next();
}


const verificarSenhaCreate = (req, res, next)=>{
    const {password2, password } = req.headers;

    if(password !== password2){
        console.log(password, password2)
        return res.status(400).send("senhas diferentes");
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
        return res.status(401).send({errors})
    }

    next();
}



const usersController = require('../controllers/usersController');
const UsersController = new usersController;

usersRoutes.get('/', verificarDadosLogin, notExistUsernameLogin, NotAutheticPasswordLogin, UsersController.login);
usersRoutes.post('/', validarCPF, verificarSenhaCreate, isEmailUsernameCpfCreate, UsersController.create);

module.exports = usersRoutes;
