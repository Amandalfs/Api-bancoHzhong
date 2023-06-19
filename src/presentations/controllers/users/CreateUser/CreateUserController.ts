
import { HttpController, HttpRequest, HttpResponse, BadRequest, ServerError, Unauthorized, ICreateUserUseCase, Created } from './CreateUserControllerProtocols';
import { InvalidParams } from './errors/InvalidParams';

export class CreateUserController implements HttpController{
    constructor(private CreateUserUseCase: ICreateUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const {username, name, nasc, typeaccont, email} = req.body;
            const { password, passwordConfirmation, cpf } = req.headers;
            if(!username){
                throw new InvalidParams("Username");
            }

            if(!name){
                throw new InvalidParams("Name");
            }

            if(!nasc){
                throw new InvalidParams("Nasc");
            }

            if(!typeaccont){
                throw new InvalidParams("TypeAccont");
            }
            
            if(!email){
                throw new InvalidParams("Email");
            }

            if(!password){
                throw new InvalidParams("Password");
            }

            if(!passwordConfirmation){
                throw new InvalidParams("PasswordConfirmation");
            }

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