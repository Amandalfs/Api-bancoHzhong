
import { HttpController, HttpRequest, HttpResponse, BadRequest, ServerError, Unauthorized, ICreateUserUseCase } from './CreateUserControllerProtocols';

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

            if(error.statusCode === 400){
                return BadRequest(error.message);
            }

            if(error.statusCode === 401){
                return Unauthorized(error.message);
            }
        }
    }

}