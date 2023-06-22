
import { DTORequestWithdrawTransctionsUseCase, IWithdrawTransctionsUseCase } from '../../../../module/transactions/useCase/WithdrawTransactions/WithdrawTransactionsUseCase';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { HttpController } from './../../../protocols/Controller';
import { BadRequest, NotFound, ServerError, Unauthorized } from './../../../helpers';
import { InvalidParams } from '../../errors/InvalidParams';

export class WithdrawTransactionsController implements HttpController {
    constructor(private withdrawTransctionsUseCase: IWithdrawTransctionsUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { withdraw } = req.body;

            if(!withdraw){
                throw new InvalidParams("withdraw")
            }

            const input = new DTORequestWithdrawTransctionsUseCase(withdraw, id);
            const output = await this.withdrawTransctionsUseCase.execute(input);

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