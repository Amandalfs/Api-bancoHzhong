const { Router } = require("express");
const keysRoutes = Router();

const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');


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

const KeysController = require('../controllers/KeysController');
const keysController = new KeysController;

keysRoutes.post('/keys', garantirAuth, NotAutheticPassword, isKeyPix, keysController.create);
keysRoutes.delete('/keys',garantirAuth, NotAutheticPassword, notIsKeyPix, keysController.delete);
