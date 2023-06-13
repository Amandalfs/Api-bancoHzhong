import { Request, Response } from "express";
import { SendingMoneyUseCase } from "./SendingMoneyUseCase";

class SendingMoneyController {
    constructor(private SendingMoneyUseCase: SendingMoneyUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user;
        const {deposit, keypix } = req.body;
      
        const {extratos} = await this.SendingMoneyUseCase.execute({id, keyPix: keypix, value: deposit});
    
        return res.status(201).send({extratos});
    }

}

export { SendingMoneyController }