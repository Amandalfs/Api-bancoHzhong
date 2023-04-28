const dbUsers = require('../sql/dbUsers');
const garantirAuth = require('../middlewares/garantirAuth');


const notIsKeyPix = async(req, res, next) =>{
    const { id } = req.user;

    const errors = [];

    const user = await dbUsers.getUserById({id: id});
    if(user.keypix==null){
        errors.push("Nao existe uma chave para deletar")
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



const deleteKeyPixUser = (app) => {
    app.route('/users/deleteKeyPix')
        .patch(garantirAuth, NotAutheticPassword, notIsKeyPix, async(req, res)=>{
            const { id } = req.user

            await dbUsers.updateUser({ id: id }, { keypix: null });
            const result = await dbUsers.getUserById({id: id})
            return res.status(200).send({"msg": "Chave Deletada com sucesso"});
            
        })
}

module.exports = deleteKeyPixUser;