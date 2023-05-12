import { Request, Response } from "express";
import { CreateKeyUseCase } from "./CreateKeyUseCase";

class CreateKeyController {
    constructor(private CreateKeyUseCase: CreateKeyUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user;

        const keypix = await this.CreateKeyUseCase.execute(id);

        return res.status(201).send({"key":keypix});
    }
}

export { CreateKeyController }