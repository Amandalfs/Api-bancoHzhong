import { 
    HttpController, HttpRequest, HttpResponse, 
    NotFound, ServerError, Success,
    DTORequestShowUserUseCase, IShowUserUseCase
} from "./ShowUserControllersProtocols";

export class ShowUserController implements HttpController {
    constructor(private useCaseShowUser: IShowUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;

            const input = new DTORequestShowUserUseCase(id)
            const ouput = await this.useCaseShowUser.execute(input);
            return Success(ouput);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }

            if(error.statusCode === 404){
                return NotFound(error.message);
            }
        }
    }

}