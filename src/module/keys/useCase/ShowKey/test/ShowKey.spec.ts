import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { ShowKeyUseCase } from "../ShowKeyUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";
import { keyGenerator } from "../../../../../utils/keyGenerator";


describe("Testando o show users", ()=>{
    
    it("usuario nao deve consegui usar o show que a ckey dele nao existir", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const showKeyUseCase =  new ShowKeyUseCase(usersRepository);
        
        const senhaCriptografada = hash("12345678", 8)

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
        });

        await expect(showKeyUseCase.execute(1)).rejects.toEqual(new AppError("Chave pix nao existe"))
    })

    it("usuario deve conseguir usar o show para monstrar a key existente", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const showKeyUseCase = new ShowKeyUseCase(usersRepository);

        const senhaCriptografada = hash("12345678", 8)

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
        });

        const chave = await keyGenerator();
        await usersRepository.createKeyPixById(1, chave);

        const key = await showKeyUseCase.execute(1);
        expect(key).toEqual(expect.any(String))
    })
})