import { AppError } from "../../utils/AppError";

export class TokenNotSentError extends AppError{
    constructor(){
        super("Token não foi recebido");
    }
}