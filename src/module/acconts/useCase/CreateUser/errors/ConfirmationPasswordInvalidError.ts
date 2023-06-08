import { AppError } from "../../../../../utils/AppError";

export class ConfirmationPasswordInvalidError extends AppError {
    constructor(){
        super("A senha e senha de confirmação estão direntes.")
    }
}