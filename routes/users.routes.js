const db = require('../sql/knex/index');
const { compare } = require('bcrypt');

const { Router } = require("express");
const usersRoutes = Router();

const garantirAuth = require('../middlewares/garantirAuth');

const createUserController = require('../module/acconts/useCase/CreateUser');

const usersController = require('../controllers/usersController');
const UsersController = new usersController;

usersRoutes.get('/', UsersController.login);

usersRoutes.post('/', (req, res)=>{
    return createUserController.handle(req, res);
});

usersRoutes.get('/show', garantirAuth, UsersController.show);

module.exports = usersRoutes;
