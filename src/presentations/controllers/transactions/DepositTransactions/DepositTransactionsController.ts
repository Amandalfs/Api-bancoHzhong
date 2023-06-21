import { DTORequestDepositTransactionsUseCase, IDepositTransactionsUseCase } from "../../../../module/transactions/useCase/DepositTransactions/DepositTransactionsUseCase";
import { BadRequest, NotFound, ServerError, Success } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DepositTransactionsController implements HttpController {
    constructor(private depositTransactionsUseCase: IDepositTransactionsUseCase){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { deposit } = req.body;

            const input = new DTORequestDepositTransactionsUseCase(id, deposit);
            const output = await this.depositTransactionsUseCase.execute(input);
            return Success(output);
        } catch (error) {

            if(!error.statusCode){
                return ServerError();
            }

            if(error.statusCode === 400){
                return BadRequest(error.message);
            }

            if(error.statusCode === 404){
                return NotFound(error.message);
            }
        }
    }

}