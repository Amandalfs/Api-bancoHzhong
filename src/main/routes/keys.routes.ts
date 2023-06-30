import { Request, Response, Router } from 'express';
const keysRoutes = Router();
import garantirAuth from '../../middlewares/garantirAuth';


import createKeyController from '../../domain/module/keys/useCase/CreateKey';
import deleteKeyController from "../../domain/module/keys/useCase/DeleteKey";
import showKeyController from "../../domain/module/keys/useCase/ShowKey";

keysRoutes.patch('/', garantirAuth, (req: Request, res: Response)=>{
    return createKeyController.handle(req, res);
});

keysRoutes.delete('/',garantirAuth, (req: Request, res: Response)=>{
    return deleteKeyController.handle(req, res);
});

keysRoutes.get('/', garantirAuth, (req: Request, res: Response)=>{
    return showKeyController.handle(req, res);
});

export { keysRoutes };