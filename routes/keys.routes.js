const { Router } = require("express");
const keysRoutes = Router();
const garantirAuth = require('../middlewares/garantirAuth');

const KeysControllerClasse = require('../controllers/KeysController');
const keysController = new KeysControllerClasse;

keysRoutes.patch('/', garantirAuth, keysController.create);
keysRoutes.delete('/',garantirAuth, keysController.delete);
keysRoutes.get('/', garantirAuth, keysController.getKey);

module.exports = keysRoutes;