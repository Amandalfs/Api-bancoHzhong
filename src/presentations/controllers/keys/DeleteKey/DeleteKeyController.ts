import { DTORequestDeleteKeyUseCase, IDeleteKeyUseCase } from "../../../../domain/module/keys/useCase/DeleteKey/DeleteKeyUseCase";
import { ServerError } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DeleteKeyController implements HttpController {
    constructor(private deleteKeyUseCase: IDeleteKeyUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const input = new DTORequestDeleteKeyUseCase(id);
            await this.deleteKeyUseCase.execute(input);
        } catch (error) {
            if(!error.statusCode){
                return ServerError();
            }
        }
    }
}