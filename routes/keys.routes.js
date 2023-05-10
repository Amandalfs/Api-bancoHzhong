const { Router } = require("express");
const keysRoutes = Router();
const garantirAuth = require('../middlewares/garantirAuth');


const createKeyController = require('../module/keys/useCase/CreateKey');
const deleteKeyController = require("../module/keys/useCase/DeleteKey");
const showKeyController = require("../module/keys/useCase/ShowKey");

keysRoutes.patch('/', garantirAuth, (req, res)=>{
    return createKeyController.handle(req, res);
});

keysRoutes.delete('/',garantirAuth, (req, res)=>{
    return deleteKeyController.handle(req, res);
});

keysRoutes.get('/', garantirAuth, (req, res)=>{
    return showKeyController.handle(req, res);
});

module.exports = keysRoutes;