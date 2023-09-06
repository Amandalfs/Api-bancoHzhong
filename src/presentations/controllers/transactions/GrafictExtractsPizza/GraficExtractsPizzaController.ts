import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { BadRequest, ServerError, Unauthorized } from "../DepositTransactions/DepositTransactionsControllerProtocols";
import { IGraficExtractsPizzaUseCase } from './../../../../domain/module/transactions/useCase/GraficExtractsPizza/GraficExtractsPizzaUseCase';

export class GraficExtractsPizzaController implements HttpController {
    
    constructor(private graficExtractsPizzaUseCase: IGraficExtractsPizzaUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { startDate, endDate } = req.query;
            const input = { 
                id,
                startDate,
                endDate,
            }
            const output = await this.graficExtractsPizzaUseCase.execute(input);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    private handleErrors(error:any) {
        if(!error.statusCode){
            return ServerError();
        }

        if(error.statusCode === 400){
            return BadRequest(error.message);
        }

        if(error.statusCode === 401){
            return Unauthorized(error.message);
        }
    }
}