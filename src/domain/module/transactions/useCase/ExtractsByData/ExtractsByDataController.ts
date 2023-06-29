import { Request, Response } from "express";
import { ExtractsByDataUseCase } from "./ExtractsByDataUseCase";

class ExtractsByDataController {
    constructor(private ExtractsByDataUseCase: ExtractsByDataUseCase){}

    async handle(req: Request, res: Response){
        const { id } = req.user
        const {dateInicial, dateFinal} = req.query

        const {extracts} = await this.ExtractsByDataUseCase.execute({
            id_user: id, 
            dateStart: dateInicial, 
            dateEnd: dateFinal});

        return res.status(200).json(extracts);
    }
}

export { ExtractsByDataController }