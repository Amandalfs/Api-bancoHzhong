import { Request, Response, Router } from 'express';
const keysRoutes = Router();

import { ControllerAdapterExpress } from './../controllers/ControllerAdapterExpress';

import { makeCreateKeyController } from '../controllers/factores/makeKeys/makeCreateKeyController';
import { makeShowKeyController } from '../controllers/factores/makeKeys/makeShowKeyController';
import { makeDeleteKeyController } from '../controllers/factores/makeKeys/makeDeleteKeyController';

keysRoutes.post('/', (req: Request, res: Response)=>{
    const controller = makeCreateKeyController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.delete('/', (req: Request, res: Response)=>{
    const controller = makeDeleteKeyController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

keysRoutes.get('/', (req: Request, res: Response)=>{
    const controller = makeShowKeyController();
    return ControllerAdapterExpress.handle(req, res, controller);
});

export { keysRoutes };