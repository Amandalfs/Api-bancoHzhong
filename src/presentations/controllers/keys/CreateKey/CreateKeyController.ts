import { DTORequestCreatekeyUseCase, ICreatekeyUseCase } from "../../../../module/keys/useCase/CreateKey/CreateKeyUseCase";
import { ServerError } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class CreateKeyController implements HttpController {
    constructor(private createKeyUseCase: ICreatekeyUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const input = new DTORequestCreatekeyUseCase(id);
            await this.createKeyUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }
}