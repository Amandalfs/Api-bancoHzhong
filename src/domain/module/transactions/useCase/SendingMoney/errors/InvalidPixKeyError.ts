import { AppError } from "../../../../../../utils/errors/AppError";

export class InvalidPixKeyError extends AppError {
    constructor(){
        super("A Chave pix é inválida")
    }
}