import { Request, Response } from "express";
import { SendingMoneyUseCase } from "./SendingMoneyUseCase";

class SendingMoneyController {
    constructor(private SendingMoneyUseCase: SendingMoneyUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user;
        const {deposit, keypix } = req.body;
      
        const extracts = await this.SendingMoneyUseCase.execute(id, keypix, deposit);
    
        return res.status(201).send({extracts});
    }

}

export { SendingMoneyController }