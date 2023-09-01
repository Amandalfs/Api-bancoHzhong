import { IModifyUserUseCase } from "../../../../domain/module/acconts/useCase/ModifyUser/ModifyUserUseCase";
import { HttpController, HttpRequest, HttpResponse, ServerError, Success } from "../CreateUser/CreateUserControllerProtocols";

export class ModifyUserController implements HttpController {
    
    constructor(private modifyUserUseCase: IModifyUserUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, email, password, oldPassword, username } = req.body;
            const { id } = req.user;
            const input = {
                id,
                userUpdate: {
                    name: name ?? "",
                    email: email ?? "",
                    username: username ?? "", 
                    password: password ?? "",
                    oldPassword: oldPassword ?? "",
                }
            }
                
            const output = await this.modifyUserUseCase.execute(input);
            return Success(output);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }

}