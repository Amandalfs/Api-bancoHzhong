import { Request, Response } from "express";

import { Router } from "express";
const usersRoutes = Router();

import garantirAuth from "../../middlewares/garantirAuth";

import showUserController from "../../domain/module/acconts/useCase/ShowUser";
import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";
const controllerAdapterExpress = new ControllerAdapterExpress;

import { makeSessionsUserController } from "../controllers/factores/makeUsers/makeSessionsUserController";
import { makeCreateUserController } from "../controllers/factores/makeUsers/makeCreateUserController";

usersRoutes.post('/sessions', (req: Request, res: Response)=>{
    const controller = makeSessionsUserController();
    return controllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.post('/', (req: Request, res: Response)=>{
    const controller = makeCreateUserController();
    return controllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.get('/show', garantirAuth, (req: Request, res: Response)=>{
    return showUserController.handle(req, res)
});

export { usersRoutes };
