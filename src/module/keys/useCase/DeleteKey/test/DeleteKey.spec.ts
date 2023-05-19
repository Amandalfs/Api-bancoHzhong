import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { DeleteKeyUseCase } from "../DeleteKeyUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";
import { keyGenerator } from "../../../../../utils/keyGenerator";

describe("Testando o DeleteUser", ()=>{

    it("Usuario nao deve conseguir deleta a chave dele que nao existe", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const deleteKeyUseCase = new DeleteKeyUseCase(usersRepository);

        const senhaCriptografada = await hash("12345678", 8);
        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096"
        })

        await expect(deleteKeyUseCase.execute(1)).rejects.toEqual(new AppError("Chave pix nao existe"))
    })

    it("Usuario deve conseguir deleta a chave dele que existe", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const deleteKeyUseCase = new DeleteKeyUseCase(usersRepository);

        const senhaCriptografada = await hash("12345678", 8);
        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096"
        })

        const keyDelete = await keyGenerator();
        await usersRepository.createKeyPixById(1, keyDelete);
    
        const response = deleteKeyUseCase.execute(1)
        await expect(response).toEqual(expect.any(Object))
    })
})