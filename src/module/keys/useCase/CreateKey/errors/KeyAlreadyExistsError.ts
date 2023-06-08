import { AppError } from "../../../../../utils/AppError";

export class KeyAlreadyExistsError extends AppError{
    constructor(){
        super("Chave pix Ja existe");
    }
}