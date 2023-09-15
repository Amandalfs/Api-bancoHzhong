import { AppError } from "./AppError";

export class NotAuthorizationError extends AppError{
	constructor(){
		super("Not authorization", 403);
	}
}