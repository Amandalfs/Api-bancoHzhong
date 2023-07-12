import { Request, Response, Router } from 'express';
const keysRoutes = Router();
import garantirAuth from '../../middlewares/garantirAuth';


import { ControllerAdapterExpress } from './../controllers/ControllerAdapterExpress';

import { makeCreateKeyController } from '../controllers/factores/makeKeys/makeCreateKeyController';
import { makeShowKeyController } from '../controllers/factores/makeKeys/makeShowKeyController';
import { makeDeleteKeyController } from '../controllers/factores/makeKeys/makeDeleteKeyController';

const controllerAdapterExpress = new ControllerAdapterExpress;

keysRoutes.post('/', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeCreateKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.delete('/',garantirAuth, (req: Request, res: Response)=>{
    const controller = makeDeleteKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.get('/', garantirAuth, (req: Request, res: Response)=>{
    const controller = makeShowKeyController();
    return controllerAdapterExpress.handle(req, res, controller);
});

export { keysRoutes };