const { Router } = require("express");
const keysRoutes = Router();

const garantirAuth = require('../middlewares/garantirAuth');
const dbUsers = require('../sql/dbUsers');
const AppError = require('../utils/AppError');

const notIsKeyPix = async(req, res, next) =>{
    const { id } = req.user;

    const user = await dbUsers.getUserById({id: id});
    if(user.keypix==null){
        throw new AppError("Nao existe uma chave para deletar", 401);
    }

    next()
}

const isKeyPix = async(req, res, next) =>{
    const { id } = req.user;

    const user = await dbUsers.getUserById({id: id});
    if(user.keypix){
        throw new AppError("Uma chave pix ja existe", 401);
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
        throw new AppError("Senha digitada esta Errada!!", 401);
    }

    next();
}

const KeysControllerClasse = require('../controllers/KeysController');
const keysController = new KeysControllerClasse;

keysRoutes.patch('/', garantirAuth, NotAutheticPassword, isKeyPix, keysController.create);
keysRoutes.delete('/',garantirAuth, NotAutheticPassword, notIsKeyPix, keysController.delete);

module.exports = keysRoutes;