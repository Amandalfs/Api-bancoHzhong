import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { ShowUserUseCase } from "../ShowUserUseCase";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { AppError } from "../../../../../utils/AppError";
import { hash } from 'bcrypt';

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: ShowUserUseCase;

describe("Testando a funcionalidade show users", ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new ShowUserUseCase(usersRepository, extractsRepository);
    })

    it("Usuario nao deve conseguir usar show sem uma conta", async ()=>{
      
        await expect(sut.execute(515)).rejects.toEqual(new AppError("Usuario nao encontrado"))
    })

    
    it("Usuario deve conseguir usar show com uma conta existente", async ()=>{
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


        const response = await sut.execute(1)
        expect(response).toEqual(expect.any(Object))
    })
})