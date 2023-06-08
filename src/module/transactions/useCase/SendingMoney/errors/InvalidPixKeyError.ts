import { AppError } from "../../../../../utils/AppError";

export class InvalidPixKeyError extends AppError {
    constructor(){
        super("A Chave pix é inválida")
    }
}