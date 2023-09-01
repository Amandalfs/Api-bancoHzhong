import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { ModifyUserUseCase } from "./ModifyUserUseCase";
import { CodificadorAdapterCrypto } from './../../../../../utils/Codificador/CodificadorAdapterCrypto';


const makeSuit = ()=>{
    const repository = new InMemoryUsersRepository();
    const cod = new CodificadorAdapterCrypto();
    const suit = new ModifyUserUseCase(repository, cod);
    return {
        repository,
        suit,
    }
} 
describe("tests units modify user", ()=>{

    it("should be able to change the user's name", async ()=>{
        const { suit, repository } = makeSuit();

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
            name:  "new Username",
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.name).toEqual(newUser.name);
    })
});