import { DTORequestExtractsByDateUseCase, IExtractsByDateUseCase } from "../../../../module/transactions/useCase/ExtractsByData/ExtractsByDataUseCase";
import { HttpController } from "../../../protocols/Controller"
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { BadRequest, NotFound, ServerError, Unauthorized } from "../../../helpers";
import { InvalidParams } from "../../errors/InvalidParams";

export class ExtractsByDateTransactionsController implements HttpController {
    constructor(private extractsByDateUseCase: IExtractsByDateUseCase){

    }
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user
            const { dateStart, dateEnd } = req.query;

            if(!dateStart){
                throw new InvalidParams("DateStart");
            }

            const input = new DTORequestExtractsByDateUseCase(id, dateStart, dateEnd);
            await this.extractsByDateUseCase.execute(input);

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