import { AppError } from "../../../../../utils/AppError";

export class InvalidCpfError extends AppError {
    constructor(){
        super("Cpf Invalido", 401);
    }
}