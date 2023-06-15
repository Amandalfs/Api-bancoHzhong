import { AppError } from "../../../utils/errors/AppError";

export class InvalidValueError extends AppError {
    constructor(){
        super("Valor invalido")
    }
}