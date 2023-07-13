import { DTORequestWithdrawTransctionsUseCase, IWithdrawTransctionsUseCase,
        HttpRequest, HttpResponse, HttpController,
        BadRequest, NotFound, ServerError, Success, 
        Unauthorized,  InvalidParams
} from './WithdrawTransactionsControllerProtocols';

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
            return Success(output);
        } catch (error) {
            if(!error.statusCode){
                console.error(error)
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