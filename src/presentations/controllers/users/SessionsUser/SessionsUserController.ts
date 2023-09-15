import { ISessionsUsersUseCase } from "../../../../domain/module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";
import { InvalidParams } from "../../errors/InvalidParams";
import { BadRequest, HttpController, HttpRequest, HttpResponse, ServerError, Success, Unauthorized } from "../CreateUser/CreateUserControllerProtocols";

export class SessionsUserController implements HttpController {
	constructor(private useCaseSessions: ISessionsUsersUseCase){}

	async handle(req: HttpRequest): Promise<HttpResponse> {
		try {
			const { password, username } = req.body;    

			if(!username){
				throw new InvalidParams("Username");
			}

            
			if(!password){
				throw new InvalidParams("Password");
			}

			const { token } = await this.useCaseSessions.execute({username, password});

			return Success({token});

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