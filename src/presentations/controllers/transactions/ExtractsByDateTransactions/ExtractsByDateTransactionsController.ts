import { DTORequestExtractsByDateUseCase, IExtractsByDateUseCase } from "../../../../domain/module/transactions/useCase/ExtractsByData/ExtractsByDataUseCase";
import { HttpController } from "../../../protocols/Controller"
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { BadRequest, NotFound, ServerError, Success, Unauthorized } from "../../../helpers";
import { InvalidParams } from "../../errors/InvalidParams";

export class ExtractsByDateTransactionsController implements HttpController {
    constructor(private extractsByDateUseCase: IExtractsByDateUseCase){

    }
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user
            const { dateStart, dateEnd, page, rows } = req.query;            

            if(!dateStart){
                throw new InvalidParams("DateStart");
            }

            if(!dateEnd){
                throw new InvalidParams("DateEnd");
            }

            const input = new DTORequestExtractsByDateUseCase(id, new Date(dateStart), new Date(dateEnd), page ?? 1, rows ?? 5);
            const output = await this.extractsByDateUseCase.execute(input);

            return Success(output);

        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }

            if(error.statusCode === 400){
                return BadRequest(error.message);
            }

            if(error.statusCode === 401){
                return Unauthorized(error.message);
            }

            if(error.statusCode === 404){
                return NotFound(error.message);
            }
        }
    }
}