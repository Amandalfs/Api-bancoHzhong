
import { Codificador } from './Codificador';
import { hash, compare } from 'bcrypt';

export class CodificadorAdapterCrypto implements Codificador {
    async criptografia(password: string, salto: number): Promise<string> {
        const passwordCriptograda = await hash(password, salto)
        return passwordCriptograda;
    }

    async comparador(passwordCriptogrado: any, password: any): Promise<boolean> {
        const isTrue = await compare(password, passwordCriptogrado);
        return isTrue; 
    }

}