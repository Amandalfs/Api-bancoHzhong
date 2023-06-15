import { IUser } from "../model/IUser"

export interface  IReponseUser {
     id?: number, 
     name: string,
     username: string,
     password: string,
     nasc: string,
     typeaccont: string,
     saldo: number,
     agencia: string,
     cpf: string,
     keypix?:string,
}

export interface IUserRepository {
     createUser(data: IUser): Promise<void>

     findUserByUsername(username:string): Promise<IReponseUser>

     findUserById(id:number): Promise<IReponseUser>

     findUserByCPF(cpf:string): Promise<IReponseUser>

     findUserByEmail(email:string): Promise<IReponseUser>

     findUserByKeyPix(keypix:string): Promise<IReponseUser>

     updateBalanceById(id:number, saldo:number): Promise<void>

     createKeyPixById(id:number, key:string): Promise<void>

     deleteKeyPixById(id:number):Promise<void>

     getKeyPixById(id:number):Promise<string>
   
}