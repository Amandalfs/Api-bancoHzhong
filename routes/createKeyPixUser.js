const keyGenerator = require('../utils/keyGenerator')
const pool = require('../sql/sqlconfig');
const selectAll = require('../utils/selectAll');
const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');

const isKeyPix = async(req, res, next) =>{
    const { id } = req.user;

    const errors = [];

    const user = await dbUsers.getUserById({id: id});
    if(user.keypix==!null){
        errors.push("Uma chave pix ja existe")
    }

    if(errors.length!==0){
        return res.status(401).send(errors);
    }


    next()
}

const NotAutheticPassword = async (req, res, next) =>{
    const { compare } = require('bcrypt')
    
    const { id } = req.user;
    const { password } = req.headers;

    const user = await dbUsers.getUserById({id: id});
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digitada esta errada")
    }

    next();
}


const createKeyPixUser = (app) =>{
    app.route('/users/createKey')
        .patch(garantirAuth, NotAutheticPassword, isKeyPix, async(req, res) =>{
            const { id } = req.user

            const ChaveGerada =  await keyGenerator();
            console.log(ChaveGerada);
            await dbUsers.updateUser({id: id}, {
                keypix: ChaveGerada
            })

            const user = await dbUsers.getUserById({id: id});
            const { keypix } = user;
            return res.status(201).send({"key":keypix});
            
        })
}

module.exports = createKeyPixUser;