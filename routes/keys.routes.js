const { Router } = require("express");
const keysRoutes = Router();
const garantirAuth = require('../middlewares/garantirAuth');

const KeysControllerClasse = require('../controllers/KeysController');
const keysController = new KeysControllerClasse;

const createKeyController = require('../module/keys/useCase/CreateKey');
const deleteKeyController = require("../module/keys/useCase/DeleteKey");

keysRoutes.patch('/', garantirAuth, (req, res)=>{
    return createKeyController.handle(req, res);
});


keysRoutes.delete('/',garantirAuth, (req, res)=>{
    return deleteKeyController.handle(req, res);
});

keysRoutes.get('/', garantirAuth, keysController.getKey);

module.exports = keysRoutes;