const { Router } = require('express')
const usersRoutes = require('./users.route');
const transitionsRoutes = require('./transitions.route.js')

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/users", transitionsRoutes);
routes.use("/users", transitionsRoutes);
routes.use("/", (req, res) => res.send('Bem vindo(a) a api do banco hzhong'));
module.exports = routes;