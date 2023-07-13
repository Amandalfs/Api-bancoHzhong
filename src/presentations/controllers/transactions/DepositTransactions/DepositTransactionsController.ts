import { HttpRequest, HttpResponse, HttpController,
    BadRequest, NotFound, ServerError, Success,
    DTORequestDepositTransactionsUseCase, IDepositTransactionsUseCase
} from "./DepositTransactionsControllerProtocols";

export class DepositTransactionsController implements HttpController {
    constructor(private depositTransactionsUseCase: IDepositTransactionsUseCase){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { deposit } = req.body;

            const input = new DTORequestDepositTransactionsUseCase(deposit, id);
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