import { AppError } from "../../../../../utils/errors/AppError";

export class KeyAlreadyExistsError extends AppError{
    constructor(){
        super("Chave pix Ja existe");
    }
}