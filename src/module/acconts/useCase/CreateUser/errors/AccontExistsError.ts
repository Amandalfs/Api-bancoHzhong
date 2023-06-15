import { AppError } from "../../../../../utils/errors/AppError";

export class AccontExistsError extends AppError {
    constructor(params){
        super(`ja existente uma conta com esse ${params}`);
    }    
}