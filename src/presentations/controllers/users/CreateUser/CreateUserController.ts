
import { HttpController, HttpRequest, HttpResponse, BadRequest, ServerError, Unauthorized, ICreateUserUseCase, Created, ICreateUserRequestDTO } from './CreateUserControllerProtocols';
import { InvalidParams } from '../../errors/InvalidParams';

export class CreateUserController implements HttpController{
    constructor(private CreateUserUseCase: ICreateUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const {username, name, nasc, typeaccont, email} = req.body;
            const { password, passwordConfirmation, cpf } = req.headers;

            const params =  [
                {param: username, error:"Username"},
                {param: name, error:"Name"},
                {param: nasc, error:"Nasc"},
                {param: typeaccont, error:"TypeAccont"},
                {param: email, error:"Email"},
                {param: password, error:"Password"},
                {param: passwordConfirmation, error:"PasswordConfirmation"},
                {param: cpf, error:"Cpf"},

            ]

            params.map((item)=>{
                if(!item.param){
                    throw new InvalidParams(item.error);
                }
            })   
            
            const { user } = await this.CreateUserUseCase.execute({username, name, nasc, typeaccont, email,  password, password2: passwordConfirmation, cpf});
            
            return Created(user);
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