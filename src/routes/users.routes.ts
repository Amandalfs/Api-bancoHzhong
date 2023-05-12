import { Request, Response } from "express";

import { Router } from "express";
const usersRoutes = Router();

import garantirAuth from "../middlewares/garantirAuth";

import createUserController from '../module/acconts/useCase/CreateUser';
import sessionsUsersController from '../module/acconts/useCase/SessionsUsers';
import showUserController from "../module/acconts/useCase/ShowUser";

usersRoutes.get('/', (req: Request, res: Response)=>{
    return sessionsUsersController.handle(req, res);
});

usersRoutes.post('/', (req: Request, res: Response)=>{
    return createUserController.handle(req, res);
});

usersRoutes.get('/show', garantirAuth, (req: Request, res: Response)=>{
    return showUserController.handle(req, res)
});

export { usersRoutes };
