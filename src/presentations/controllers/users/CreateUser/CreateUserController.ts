
import { ICreateUserUseCase } from '../../../../module/acconts/useCase/CreateUser/CreateUserUseCase';
import { ServerError } from '../../../helpers';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { HttpController } from './../../../protocols/Controller';

export class CreateUserController implements HttpController{
    constructor(private CreateUserUseCase: ICreateUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const {username, name, nasc, typeaccont, email} = req.body;
            const { password, password2, cpf } = req.headers;

            await this.CreateUserUseCase.execute({username, name, nasc, typeaccont, email,  password, password2, cpf});

        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }

}