const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');
const { hash } = require('bcrypt')
const db = require('../sql/knex/index');
const dbUsers = require('../sql/dbUsers');
const AppError = require('../utils/AppError');

const useCaseUsersCreate = (nasc) => {
    const verifyAge = require('../utils/verify/verifyAge');

    if(verifyAge(nasc)){
        throw new AppError("Usuario e menor de idade", 401);
    }
}

class usersController{
    async login(req, res){
        const {username} = req.body;
           
        const user = await db('users').where("username", username).select().first()

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        res.status(202).send({token})
        
    }
    async create(req, res){
        const {username, name, nasc, typeaccont, email} = req.body;
        const { password, cpf } = req.headers;

        useCaseUsersCreate(nasc);

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
    }

    async show(req, res){
        const { id } = req.user;
        const extracts = await db('extratos').where({id_user: id}).orderBy('data', 'desc').limit(5);
        const user = await dbUsers.getUserById({ id });

        return res.status(201).json({ 
            username: user.username,
            saldo: user.saldo,
            extracts
        });
    }
}

module.exports = usersController;