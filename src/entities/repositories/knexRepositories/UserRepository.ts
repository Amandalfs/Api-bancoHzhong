import { db } from "../../../sql/knex";
import { IReponseUser, IUserRepository } from "../implementations/IUserRepository";
import { IUser } from "../model/IUser";


class UserRepository implements IUserRepository {
    async createUser(data: IUser){
        await db('users').insert(data);   
    }

    async findUserByUsername(username:string){
        return await db('users').where("username",username).first();
    }

    async findUserById(id:number){
        return await db('users').where("id",id).first();
    }

    async findUserByCPF(cpf:string){
        return await db('users').where("cpf", cpf).first();
    }

    async findUserByEmail(email:string){
        return await db('users').where("email", email).first();
    }

    async findUserByKeyPix(keypix:string){
        return await db('users').where('keypix', keypix).first();
    }

    async updateBalanceById(id:number, saldo:number){
        await db('users').where("id", id).update("saldo", saldo);
    }

    async createKeyPixById(id:number, key:string){
        await db('users').where("id", id).update("keypix", key);
    }

    async deleteKeyPixById(id:number){
        await db('users').where("id", id).update("keypix", null);
    }

    async getKeyPixById(id:number){
        return await db('users').where("id", id).select("keypix").first();
    }
    
    async updateAccont(id: number, user: IReponseUser): Promise<IReponseUser> {
        const newUser = await db("users").where("id", id).update(user).returning("*").first();
        return newUser
    }
}

export { UserRepository }