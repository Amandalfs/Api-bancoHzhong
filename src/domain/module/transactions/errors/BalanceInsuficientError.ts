import { AppError } from "../../../../utils/errors/AppError";

export class BalanceInsuficientError extends AppError {
    constructor(){
        super("Você não tem saldo o sucifiente", 401)
    }
}