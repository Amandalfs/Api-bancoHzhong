const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');
const db = require('../sql/knex/index');
const { compare } = require('bcrypt');


const verificarDados = (req, res, next) => {
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

const notExistUsername = async (req, res, next) =>{
    const { username } = req.body;
    const isUsername = await db('users').where("username", username).select()

    if(isUsername.length===0){
        res.status(401).send("O usuario nao possui uma conta")
    }

    next()
}

const NotAutheticPassword = async (req, res, next) =>{
    
    const {username} = req.body;
    const {password} = req.headers;

    const user = await db('users').where("username", username).select().first();
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digita esta errada")
    }

    next();
}

const loginUser = (app) => {
    app.route('/users/loginUser')
        .get(verificarDados, notExistUsername, NotAutheticPassword, async(req, res) => {
            const {username} = req.body;
           
            const user = await db('users').where("username", username).select().first()

            const { secret, expiresIn } = authConfig.jwt;

            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })

            res.status(201).send({token})
        })
}


module.exports = loginUser;