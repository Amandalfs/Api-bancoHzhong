import { DTORequestShowKeyUseCase, IShowKeyUseCase } from "../../../../module/keys/useCase/ShowKey/ShowKeyUseCase";
import { ServerError } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";


export class ShowKeyController implements HttpController {
    constructor(private showKeyUseCase: IShowKeyUseCase){}
    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const input = new DTORequestShowKeyUseCase(id);
            await this.showKeyUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }
}