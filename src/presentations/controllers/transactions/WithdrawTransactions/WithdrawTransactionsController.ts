
import { DTORequestWithdrawTransctionsUseCase, IWithdrawTransctionsUseCase } from '../../../../module/transactions/useCase/WithdrawTransactions/WithdrawTransactionsUseCase';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { HttpController } from './../../../protocols/Controller';
import { ServerError } from './../../../helpers';

export class WithdrawTransactionsController implements HttpController {
    constructor(private withdrawTransctionsUseCase: IWithdrawTransctionsUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { withdraw } = req.body;
            const { id } = req.user;

            const input = new DTORequestWithdrawTransctionsUseCase(withdraw, id);
            const output = await this.withdrawTransctionsUseCase.execute(input);

        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }

}