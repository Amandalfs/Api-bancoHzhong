import { Request, Response, Router } from 'express';
const keysRoutes = Router();
import garantirAuth from '../../middlewares/garantirAuth';


import deleteKeyController from "../../domain/module/keys/useCase/DeleteKey";
import { ControllerAdapterExpress } from './../controllers/ControllerAdapterExpress';

import { makeCreateKeyController } from '../controllers/factores/makeKeys/makeCreateKeyController';
import { makeShowKeyController } from '../controllers/factores/makeKeys/makeShowKeyController';

const controllerAdapterExpress = new ControllerAdapterExpress;

keysRoutes.post('/', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeCreateKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.delete('/',garantirAuth, (req: Request, res: Response)=>{
    return deleteKeyController.handle(req, res);
});

keysRoutes.get('/', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeShowKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

export { keysRoutes };