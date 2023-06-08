import { AppError } from "../../../../../utils/AppError";

export class PassordOrUsernameInvalidError extends AppError {
    constructor(){
        super("Senha Ou Username enviada está errada", 401);
    }
}