import { DTORequestSendingMoneyUseCase, ISendingMoneyUseCase } from "../../../../module/transactions/useCase/SendingMoney/SendingMoneyUseCase";
import { HttpRequest, HttpResponse } from  "../../../protocols/http"
import { HttpController } from "../../../protocols/Controller"
import { BadRequest, ServerError, Unauthorized } from "../../../helpers";

export class SendingMoneyTransactionsController implements HttpController {
    constructor(private sendingMoneyTransactionsUseCase: ISendingMoneyUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
       try {
            const { id } = req.user;
            const { value, keypix} = req.body;
            const  input = new DTORequestSendingMoneyUseCase(id, keypix, value);
            await this.sendingMoneyTransactionsUseCase.execute(input);
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
       }
    }

}