import { AppError } from "../../../../utils/AppError";

export class KeyDoesNotExistError extends AppError {
    constructor(){
        super("Chave pix nao existe",404)
    }
}