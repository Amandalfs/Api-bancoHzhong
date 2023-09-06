import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { IGraficExtractsPizzaUseCase } from './../../../../domain/module/transactions/useCase/GraficExtractsPizza/GraficExtractsPizzaUseCase';
import { Forbidden, BadRequest, ServerError, Unauthorized, NotFound, Success } from './../../../helpers/index';

export class GraficExtractsPizzaController implements HttpController {
    
    constructor(private graficExtractsPizzaUseCase: IGraficExtractsPizzaUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const { startDate, endDate } = req.query;

            const input = { 
                id,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            }
            
            const output = await this.graficExtractsPizzaUseCase.execute(input);
            return Success(output);
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

        if(error.statusCode === 403){
            return Forbidden(error.message);
        }

        if(error.statusCode === 404){
            return NotFound(error.message);
        }

        return ServerError()
    }   
}