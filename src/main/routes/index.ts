import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { transactionsRoutes } from "./transactions.routes";
import { keysRoutes } from "./keys.routes";
import garantirAuth from "./../../middlewares/garantirAuth";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/transactions", garantirAuth, transactionsRoutes);
routes.use("/users/keys", garantirAuth, keysRoutes);

export { routes };