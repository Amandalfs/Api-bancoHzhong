const { Router } = require('express')
const usersRoutes = require('./users.routes');
const transactionsRoutes = require('./transactions.routes')
const keysRoutes = require('./keys.routes');

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/users", transactionsRoutes);
routes.use("/users/keys", keysRoutes);

module.exports = routes;