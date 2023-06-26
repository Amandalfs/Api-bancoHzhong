import { DTORequestExtractsByDateUseCase, IExtractsByDateUseCase } from "../../../../module/transactions/useCase/ExtractsByData/ExtractsByDataUseCase";
import { HttpController } from "../../../protocols/Controller"
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ServerError } from "../DepositTransactions/DepositTransactionsControllerProtocols";

export class ExtractsByDateTransactionsController implements HttpController {
    constructor(private extractsByDateUseCase: IExtractsByDateUseCase){

    }
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user
            const { dateStart, dateEnd } = req.query;
            const input = new DTORequestExtractsByDateUseCase(id, dateStart, dateEnd);
            await this.extractsByDateUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }
}