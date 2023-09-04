import { AppError } from "../../../../../../utils/errors/AppError";

export class PasswordInvalidError extends AppError {
    constructor(){
        super(`Senha não autorizada`, 403);
    }    
}