import { DeleteKeyUseCase } from "./DeleteKeyUseCase";
import { Request, Response } from "express";

class DeleteKeyController {
    constructor(private DeleteKeyUseCase: DeleteKeyUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user

        await this.DeleteKeyUseCase.execute(id);

        return res.status(200).send({"msg": "Chave Deletada com sucesso"});
    }

}

export {DeleteKeyController};