import { Request, Response } from "express";
import { ExtractsByDataUseCase } from "./ExtractsByDataUseCase";

class ExtractsByDataController {
    constructor(private ExtractsByDataUseCase: ExtractsByDataUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.query
        console.log(dateFinal, dateInicial)

        const extracts = await this.ExtractsByDataUseCase.execute(id, dateInicial, dateFinal);

        return res.status(200).json(extracts);
    }
}

export { ExtractsByDataController }