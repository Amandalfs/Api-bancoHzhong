import { AppError } from "../../../../../../utils/errors/AppError";

export class CannotSendMoneyToYourAccountError extends AppError {
	constructor(){
		super("Voce não pode enviar dinheiro para você");
	}
}