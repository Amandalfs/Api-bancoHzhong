import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { ShowKeyUseCase } from "../ShowKeyUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";
import { keyGenerator } from "../../../../../utils/keyGenerator";
import { ResourceNotFoundError } from "../../../../../utils/errors/ResourceNotFoundError";

let usersRepository: InMemoryUsersRepository;
let sut: ShowKeyUseCase;

describe("Testando o show users", ()=>{
    
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        sut =  new ShowKeyUseCase(usersRepository);
    })

    it("usuario nao deve consegui usar o show que a ckey dele nao existir", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

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

        await expect(sut.execute(1)).rejects.toEqual(new AppError("Chave pix nao existe"))
    })

    it("usuario deve conseguir usar o show para monstrar a key existente", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

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

        const chave = keyGenerator();
        await usersRepository.createKeyPixById(1, chave);

        const key = await sut.execute(1);
        expect(key).toEqual(expect.any(String))
    })

    it("Usuario sem Id existe nao poderar deletar uma chave", async ()=>{
        await expect(sut.execute(1)).rejects.toEqual(new ResourceNotFoundError());
    })
})