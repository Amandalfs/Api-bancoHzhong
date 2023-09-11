
import { IGraficDayStatsUseCase } from '../../../../domain/module/transactions/useCase/GraficDayStats/GraficDayStatsUseCase';
import { BadRequest, HttpRequest, HttpResponse, ServerError, Unauthorized } from '../DepositTransactions/DepositTransactionsControllerProtocols';
import { HttpController } from './../../../protocols/Controller';
import { InputGraficDayStatsUseCaseDTO } from './../../../../domain/module/transactions/useCase/GraficDayStats/GraficDayStatsUseCase';

export class GraficExtractsDayByColumnController implements HttpController {
    
    constructor(private graficDayStatsUseCase: IGraficDayStatsUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {

        try {
            const { id } = req.user;
            const { startDate, endDate } = req.query;
    
            const input = new InputGraficDayStatsUseCaseDTO({
                id,
                startDate,
                endDate,
            })
            const output = await this.graficDayStatsUseCase.execute(input);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    handleErrors(error: any){
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