import { DTORequestDepositTransactionsUseCase, IDepositTransactionsUseCase } from "../../../../module/transactions/useCase/DepositTransactions/DepositTransactionsUseCase";
import { ServerError } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DepositTransactionsController implements HttpController {
    constructor(private depositTransactionsUseCase: IDepositTransactionsUseCase){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { deposit } = req.body;

            const input = new DTORequestDepositTransactionsUseCase(id, deposit);
            await this.depositTransactionsUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError()
            }
        }
    }

}