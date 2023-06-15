import { AppError } from "./AppError";

export class ResourceNotFoundError extends AppError {
    constructor(){
        super("Resource Not Found", 404)
    }
}