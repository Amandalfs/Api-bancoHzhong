import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { transactionsRoutes } from "./transactions.routes";
import { keysRoutes } from "./keys.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/transactions", transactionsRoutes);
routes.use("/users/keys", keysRoutes);

export { routes };