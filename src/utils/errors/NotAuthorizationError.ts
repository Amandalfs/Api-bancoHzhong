import { AppError } from "../AppError";

export class NotAuthorizationError extends AppError{
    constructor(){
        super("Note authorization", 403);
    }
}