import { IMetricsUserUseCase } from '../../../../domain/module/acconts/useCase/MetricsUser/MetricsUserUseCase';
import { BadRequest, HttpRequest, HttpResponse, ServerError } from '../CreateUser/CreateUserControllerProtocols';
import { HttpController } from './../../../protocols/Controller';

export class MetricsUserController implements HttpController {
    
    constructor(private metricsUserUseCase: IMetricsUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const input = {
                id
            };
            const output = await this.metricsUserUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }

            if(error.statusCode === 400){
                return BadRequest(error.message);
            }
        }
    }

}