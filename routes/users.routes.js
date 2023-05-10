const { Router } = require("express");
const usersRoutes = Router();

const garantirAuth = require('../middlewares/garantirAuth');

const createUserController = require('../module/acconts/useCase/CreateUser');
const sessionsUsersController = require('../module/acconts/useCase/SessionsUsers');

const usersController = require('../controllers/usersController');
const UsersController = new usersController;

usersRoutes.get('/', (req, res)=>{
    return sessionsUsersController.handle(req, res);
});

usersRoutes.post('/', (req, res)=>{
    return createUserController.handle(req, res);
});

usersRoutes.get('/show', garantirAuth, UsersController.show);

module.exports = usersRoutes;
