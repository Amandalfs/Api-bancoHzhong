
export interface Codificador {
    criptografia(password:string, salto:number): Promise<string>
    comparador(password: string, passwordCriptogrado: string): Promise<boolean>
}