
export interface Codificador {
    criptografia(password:string, salto:number): Promise<string>
    comparador(passwordCriptogrado, password): Promise<boolean>
}