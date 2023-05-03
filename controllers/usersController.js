const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');
const db = require('../sql/knex/index');
const dbUsers = require('../sql/dbUsers')

const useCaseUsersCreate = (nasc) => {
    const verifyAge = require('../utils/verify/verifyAge');

    if(verifyAge(nasc)){
        return res.status(401).send("Usuario e menor de idade");
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

    async infos(){
        
    }
}

module.exports = usersController;