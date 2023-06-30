import { Request, Response } from "express";

import { Router } from "express";
const usersRoutes = Router();

import garantirAuth from "../../middlewares/garantirAuth";

import sessionsUsersController from '../../domain/module/acconts/useCase/SessionsUsers';
import showUserController from "../../domain/module/acconts/useCase/ShowUser";
import { ControllerAdapterExpress } from "../controllers/ControllerAdapterExpress";
import { makeCreateUserController } from "../controllers/factores/makeUsers/makeCreateUserController";
const controllerAdapterExpress = new ControllerAdapterExpress;

usersRoutes.post('/sessions', (req: Request, res: Response)=>{
    return sessionsUsersController.handle(req, res);
});

usersRoutes.post('/', (req: Request, res: Response)=>{
    const controller = makeCreateUserController();
    return controllerAdapterExpress.handle(req, res, controller);
});

usersRoutes.get('/show', garantirAuth, (req: Request, res: Response)=>{
    return showUserController.handle(req, res)
});

export { usersRoutes };
