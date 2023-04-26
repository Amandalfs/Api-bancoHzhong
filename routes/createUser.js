const { db } = require('../sql/sqlconfig');

const dbUsers = require('../sql/dbUsers');
const {hash} = require('bcrypt')

const validarCPF = (req, res, next)=>{
    const checkSizeCpf = require('../utils/verify/checkSizeCpf');
    const verifyCpf = require('../utils/verify/verifyCpf');

    const { cpf } = req.headers;

    const errors = [];
    if(verifyCpf(cpf)){
        errors.push('CPF Invalido');
    }
    if(checkSizeCpf(cpf)){
        errors.push('tamanho do CPF e invalido');
    }
    if(!cpf){
        errors.push('Campo CPF nao foi preenchido');
    }
    if(errors.length!==0){
        res.status(400).send({errors})
        return
    }

    next()

}   

const isEmailUsernameCpf = async (req, res, next)=>{
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

const verificarSenha = (req, res, next)=>{
    const {password2, password } = req.headers;

    if(password !== password2){
        console.log(password, password2)
        return res.status(400).send("senhas diferentes");
    }

    next();
}

const isMaior = (req, res, next) =>{
    const verifyAge = require('../utils/verify/verifyAge');

    const { nasc } = req.body;

    if(verifyAge(nasc)){
        return res.status(401).send("Usuario e menor de idade");
    }

    next();
}

const validarDados = (req, res, next) =>{
    const {username, name, nasc, typeaccont, email} = req.body;

    const errors = [];

    if(!username){
        errors.push("campo username nao foi preenchido")
    }
    
    if(!name){
        errors.push("campo nome nao foi preenchido")
    }

    if(!nasc){
        errors.push("campo nascimento nao foi preenchido")
    }

    if(!typeaccont){
        errors.push("campo tipo nao foi preenchido")
    }

    if(!email){
        errors.push("campo email nao foi preenchido")
    }

    if(errors.length!==0){
        return res.status(400).res({errors})
    }


    next();
}

const createUser = (app) => {
    app.route('/createUser')
        .post(validarCPF, isEmailUsernameCpf, verificarSenha, isMaior, validarDados, async (req, res) => {
            const {username, name, nasc, typeaccont, email} = req.body;
            const { password, cpf } = req.headers
            const passwordCriptografada = await hash(password, 10);
            const infosDefault = {
                numero: 153,
                agencia: "003",
                saldo: 0            
            }
            const userNew = {
                ...infosDefault,
                username: username,
                name: name,
                nasc: nasc, 
                typeaccont: typeaccont,
                email: email,
                password: passwordCriptografada,
                cpf: cpf,
            }
            await dbUsers.createUser(userNew);
            return res.status(201).send('Conta no hzhong criada com sucesso');
    
        })
}

module.exports = createUser;

