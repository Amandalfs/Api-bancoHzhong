import { AppError } from "../../../../../../utils/errors/AppError";

export class InvalidCpfError extends AppError {
	constructor(){
		super("Cpf Invalido", 401);
	}
}