import { AppError } from "../../../utils/errors/AppError";

export class LimitDayError extends AppError{
    constructor (private limit: number, private type: string){
        super(`sua conta do tipo ${type}, atingiu o limite diario R$${limit.toFixed(2)}`);
    }
}