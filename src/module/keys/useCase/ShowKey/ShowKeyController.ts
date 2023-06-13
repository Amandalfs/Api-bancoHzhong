import { Request, Response } from "express";
import { ShowKeyUseCase } from "./ShowKeyUseCase";



class ShowKeyController {
    constructor(private ShowKeyUseCase: ShowKeyUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user;
       
        const { key } = await this.ShowKeyUseCase.execute({id});
 
        return res.status(200).json(key);
    }
}

export {ShowKeyController};