import { Request, Response, Router } from 'express';
const keysRoutes = Router();
import garantirAuth from '../../middlewares/garantirAuth';


import deleteKeyController from "../../domain/module/keys/useCase/DeleteKey";
import showKeyController from "../../domain/module/keys/useCase/ShowKey";
import { ControllerAdapterExpress } from './../controllers/ControllerAdapterExpress';
import { makeCreateKeyController } from '../controllers/factores/makeKeys/makeCreateKeyController';
const controllerAdapterExpress = new ControllerAdapterExpress;

keysRoutes.post('/', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeCreateKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.delete('/',garantirAuth, (req: Request, res: Response)=>{
    return deleteKeyController.handle(req, res);
});

keysRoutes.get('/', garantirAuth, (req: Request, res: Response)=>{
    return showKeyController.handle(req, res);
});

export { keysRoutes };