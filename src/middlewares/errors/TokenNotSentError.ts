import { AppError } from "../../utils/errors/AppError";

export class TokenNotSentError extends AppError{
    constructor(){
        super("Token não foi recebido");
    }
}