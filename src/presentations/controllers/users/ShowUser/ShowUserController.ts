import { DTORequestShowUserUseCase, IShowUserUseCase } from "../../../../module/acconts/useCase/ShowUser/ShowUserUseCase";
import { InvalidParams } from "../../errors/InvalidParams";
import { HttpController, HttpRequest, HttpResponse, ServerError, Success } from "../CreateUser/CreateUserControllerProtocols";

export class ShowUserController implements HttpController {
    constructor(private useCaseShowUser: IShowUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user
            const input = new DTORequestShowUserUseCase(id)
            this.useCaseShowUser.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }

}