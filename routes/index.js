const { Router } = require('express')
const usersRoutes = require('./users.routes');
const transitionsRoutes = require('./transitions.routes')
const keysRoutes = require('./keys.routes');

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/users", transitionsRoutes);
routes.use("/users/keys", keysRoutes);

module.exports = routes;