import { checkSizeCpf } from "./checkSizeCpf";
import { verifyCpf } from "./verifyCpf";

interface IValidarCpf {
    execute(cpf:string): boolean;
}

class ValidarCpf implements IValidarCpf {
	execute(cpf: string) {
		if(verifyCpf(cpf)){
			return true;
		}

		if(checkSizeCpf(cpf)){
			return true;
		}

		if(!cpf){
			return true;
		}

		return false;
	}

}
   

export { IValidarCpf, ValidarCpf };