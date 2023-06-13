import { describe, expect, it,  beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { CreateKeyUseCase } from "../CreateKeyUseCase";
import { hash } from 'bcrypt';
import { keyGenerator } from "../../../../../utils/keyGenerator";
import { ResourceNotFoundError } from "../../../../../utils/errors/ResourceNotFoundError";
import { KeyAlreadyExistsError } from "../errors/KeyAlreadyExistsError";

let usersRepository: InMemoryUsersRepository;
let sut: CreateKeyUseCase;

describe("Teste de create key", ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        sut = new CreateKeyUseCase(usersRepository);
    })

    it("Usuario nao pode criar uma chave se ele ja estiver uma", async ()=>{
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
        })

        const ChaveGerada =  await keyGenerator()
        await usersRepository.createKeyPixById(1, ChaveGerada);

        await expect(sut.execute({id:1})).rejects.toEqual(new KeyAlreadyExistsError());
    })

    it("Usuario deve conseguir criar uma chave", async ()=>{
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
        }) 
        
        const {key} = await sut.execute({id:1})
        expect(key).toEqual(expect.any(String))
    })

    it("Nao poderar acessar esse recurso se o ID nao existir", async ()=>{
        await expect(sut.execute({id:1})).rejects.toEqual(new ResourceNotFoundError());
    })
})
