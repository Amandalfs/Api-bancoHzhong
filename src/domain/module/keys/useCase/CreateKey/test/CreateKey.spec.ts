import { describe, expect, it,  beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { CreateKeyUseCase } from "../CreateKeyUseCase";
import { hash } from 'bcrypt';
import { KeyGeneratorAdapterCrypto } from "../../../../../../utils/keyGenerator";
import { KeyAlreadyExistsError, ResourceNotFoundError } from "../errors";

let usersRepository: InMemoryUsersRepository;
let keyGenerator: KeyGeneratorAdapterCrypto;
let sut: CreateKeyUseCase;

describe("Teste de create key", ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        keyGenerator = new KeyGeneratorAdapterCrypto;
        sut = new CreateKeyUseCase(usersRepository, keyGenerator);
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

        const ChaveGerada =  await keyGenerator.execute();
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
