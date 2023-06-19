import { ISessionsUsersUseCase } from "../../../../module/acconts/useCase/SessionsUsers/SessionsUsersUseCase";
import { HttpController, HttpRequest, HttpResponse, ServerError } from "../CreateUser/CreateUserControllerProtocols";

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
        }
    }

}