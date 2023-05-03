const { Router } = require('express')
const usersRoutes = require('./users.route');
const transitionsRoutes = require('./transitions.route.js')
const keysRoutes = require('./keys.route.js');

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/users", transitionsRoutes);
routes.use("/users/keys", keysRoutes);

module.exports = routes;