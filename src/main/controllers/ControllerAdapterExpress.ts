import { Request, Response } from "express";
import { HttpController } from "../../presentations/protocols/Controller";
import { HttpRequest } from "../../presentations/protocols/http";

export class ControllerAdapterExpress {
    async handle(req: Request, res: Response, controller: HttpController){
        const request:HttpRequest = {
            body: req.body,
            headers:{ 
                ...req.headers,
                passwordConfirmation:req.headers.passwordconfirmation 
            },
            params: req.params,
            query: req.query,
            user: req.user,
        }
        const {statusCode, body} = await controller.handle(request);
        return res.status(statusCode).json(body);
    }
}