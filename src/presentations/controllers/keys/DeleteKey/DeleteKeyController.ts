import { DTORequestDeleteKeyUseCase, IDeleteKeyUseCase } from "../../../../domain/module/keys/useCase/DeleteKey/DeleteKeyUseCase";
import { BadRequest, NotFound, ServerError, Success, Unauthorized } from "../../../helpers";
import { HttpController } from "../../../protocols/Controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class DeleteKeyController implements HttpController {
    constructor(private deleteKeyUseCase: IDeleteKeyUseCase){}

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = req.user;
            const input = new DTORequestDeleteKeyUseCase(id);
            const output = await this.deleteKeyUseCase.execute(input);
            return Success(output);
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

            if(error.statusCode === 404){
                return NotFound(error.message);
            }
        }
    }
}