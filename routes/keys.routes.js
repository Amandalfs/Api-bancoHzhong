const { Router } = require("express");
const keysRoutes = Router();
const garantirAuth = require('../middlewares/garantirAuth');

const KeysControllerClasse = require('../controllers/KeysController');
const keysController = new KeysControllerClasse;

const createKeyController = require('../module/keys/useCase/CreateKey');

keysRoutes.patch('/', garantirAuth, (req, res)=>{
    return createKeyController.handle(req, res);
});

keysRoutes.delete('/',garantirAuth, keysController.delete);
keysRoutes.get('/', garantirAuth, keysController.getKey);

module.exports = keysRoutes;