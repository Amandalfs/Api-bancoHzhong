import { IReponseUser, IUserRepository } from "../implementations/IUserRepository";
import { IUser } from "../modal/IUser";

export class InMemoryUsersRepository implements IUserRepository{
    public users: IUser[] = [];

    async createUser(data: IUser) {
        const user = {
            ...data,
            id:Number(this.users.length)+1
        }
        await this.users.push(user);
    }

    async findUserByUsername(username: string): Promise<IReponseUser> {
        const user = await this.users.find(user=> user.username === username);
        return user;
    }

    async findUserById(id: number): Promise<IReponseUser> {
        const user = await this.users.find(user=> user.id === id);
        return user;
    }

    async findUserByCPF(cpf: string): Promise<IReponseUser> {
        const user = await this.users.find(user=> user.cpf === cpf);
        return user;
    }

    async findUserByEmail(email: string): Promise<IReponseUser> {
        const user = this.users.find(user => user.email===email)
        return user
    }

    async findUserByKeyPix(keypix: string): Promise<IReponseUser> {
        const user = await this.users.find(user=> user.keypix === keypix);
        return user;
    }

    async updateBalanceById(id: number, saldo: number): Promise<void> {
        await this.users.filter((user, indice)=>{
            if(id===user.id){
                this.users[indice].saldo = saldo;
            }
        })
    }

    async createKeyPixById(id: number, key: string): Promise<void> {
        await this.users.filter((user, indice)=>{
            if(id===user.id){
                this.users[indice].keypix = key;
            }
        })
    }

    async deleteKeyPixById(id: number): Promise<void> {
        await this.users.filter((user, indice)=>{
            if(id===user.id){
                this.users[indice].keypix = null;
            }
        })
    }

    async getKeyPixById(id: number): Promise<string> {
        const user = await this.users.find(user=> user.id === id);
        return user.keypix
    }

}