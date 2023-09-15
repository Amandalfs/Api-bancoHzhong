import { DTORequestSendingMoneyUseCase, ISendingMoneyUseCase } from "../../../../domain/module/transactions/useCase/SendingMoney/SendingMoneyUseCase";
import { HttpRequest, HttpResponse } from  "../../../protocols/http";
import { HttpController } from "../../../protocols/Controller";
import { BadRequest, Forbidden, NotFound, ServerError, Success, Unauthorized } from "../../../helpers";
import { InvalidParams } from "../../errors/InvalidParams";

export class SendingMoneyTransactionsController implements HttpController {
	constructor(private sendingMoneyTransactionsUseCase: ISendingMoneyUseCase){}

	async handle(req: HttpRequest): Promise<HttpResponse> {
		try {
			const { id } = req.user;
			const { value, keypix} = req.body;

			if(!keypix){
				throw new InvalidParams("keypix");
			}

			if(!value){
				throw new InvalidParams("value");
			}

			const input = new DTORequestSendingMoneyUseCase(id, keypix, value);
			const output = await this.sendingMoneyTransactionsUseCase.execute(input);
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

			if(error.statusCode === 403){
				return Forbidden(error.message);
			}

			if(error.statusCode === 404){
				return NotFound(error.message);
			}
		}
	}

}