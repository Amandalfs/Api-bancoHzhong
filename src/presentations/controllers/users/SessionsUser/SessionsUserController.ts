import { ISessionsUsersUseCase } from "../../../../module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";
import { BadRequest, HttpController, HttpRequest, HttpResponse, ServerError, Unauthorized } from "../CreateUser/CreateUserControllerProtocols";

export class SessionsUserController implements HttpController {
    constructor(private useCaseSessions: ISessionsUsersUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { password, username } = req.body;

            await this.useCaseSessions.execute({username, password});

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