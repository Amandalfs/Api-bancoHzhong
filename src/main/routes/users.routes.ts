import { Request, Response } from "express";

import { Router } from "express";
const usersRoutes = Router();

import garantirAuth from "../../middlewares/garantirAuth";

import { makeSessionsUserController } from "../controllers/factores/makeUsers/makeSessionsUserController";
import { makeCreateUserController } from "../controllers/factores/makeUsers/makeCreateUserController";
import { makeShowUserController } from "../controllers/factores/makeUsers/makeShowUserController";
import { makeModifyUserController } from "../controllers/factores/makeUsers/makeModifyUserController";
import { makeMetricsUserController } from "../controllers/factores/makeUsers/makeMetricsUserController";

import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";

usersRoutes.post("/sessions", (req: Request, res: Response)=>{
	const controller = makeSessionsUserController();
	return ControllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.post("/", (req: Request, res: Response)=>{
	const controller = makeCreateUserController();
	return ControllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.get("/show", garantirAuth, (req: Request, res: Response)=>{
	const controller = makeShowUserController();
	return ControllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.patch("/modify", garantirAuth, (req: Request, res: Response)=>{
	const controller = makeModifyUserController();
	return ControllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.get("/metrics", garantirAuth, (req: Request, res: Response) =>{
	const controller = makeMetricsUserController();
	return ControllerAdapterExpress.handle(req, res, controller);
});

export { usersRoutes };
