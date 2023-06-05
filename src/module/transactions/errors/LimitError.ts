import { AppError } from "../../../utils/AppError";

export class LimitError extends AppError{
    constructor (private limit: number, private type: string){
        super(`sua conta do tipo ${type} tem um limite de R${limit.toFixed(2)}`);
    }
}