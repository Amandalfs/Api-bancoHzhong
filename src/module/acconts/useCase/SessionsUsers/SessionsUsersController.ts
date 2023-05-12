import { Request, Response } from "express";
import { SessionsUsersUseCase } from "./SessionsUsersUseCase";


class SessionsUsersController{
    constructor(private SessionsUsersUseCase: SessionsUsersUseCase){}

    async handle(req: Request, res: Response){
        const { username, password } = req.body;
        
        const token = await this.SessionsUsersUseCase.execute(username, password);

        return  res.status(202).send({token});
    }
}

export {SessionsUsersController};