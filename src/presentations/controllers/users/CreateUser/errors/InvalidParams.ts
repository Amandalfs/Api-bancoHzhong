import { AppError } from "../../../../../utils/errors/AppError";

export class InvalidParams extends AppError {
    constructor(params){
        super(`Invalid param:${params}`, 400);
    }
}