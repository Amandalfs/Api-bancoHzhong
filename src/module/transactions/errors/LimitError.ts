import { AppError } from "../../../utils/AppError";

export class LimitError extends AppError{
    constructor (limit: number, type: string){
        super(`sua conta do tipo ${type} tem um limite de R$${limit}`, 403);
    }
}