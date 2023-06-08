import { AppError } from "../../../../../utils/AppError";

export class UserUnder18YearsOldError extends AppError {
    constructor(){
        super("Usuario é menor de idade");
    }
}