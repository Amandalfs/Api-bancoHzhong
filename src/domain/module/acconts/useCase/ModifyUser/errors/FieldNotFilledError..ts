import { AppError } from "../../../../../../utils/errors/AppError";

export class FieldNotFilledError extends AppError {
    constructor(){
        super(`Você precisa preencher pelo menos um dos campos obrigatórios.`, 400);
    }    
}