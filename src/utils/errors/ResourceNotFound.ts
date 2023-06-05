import { AppError } from "../AppError";

export class ResourceNotFound extends AppError {
    constructor(){
        super("Resource Not Found", 404)
    }
}