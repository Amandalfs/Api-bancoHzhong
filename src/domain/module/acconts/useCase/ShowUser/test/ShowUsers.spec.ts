import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryExtractsRepository } from "../../../../../../entities/repositories/inMemory/InMemoryExtractsRepository";
import { ShowUserUseCase } from "../ShowUserUseCase";
import { InMemoryUsersRepository } from "../../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { hash } from 'bcrypt';
import { ResourceNotFoundError } from "../errors";

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
      
        await expect(sut.execute({id_user:515})).rejects.toEqual(new ResourceNotFoundError())
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


        const response = await sut.execute({id_user:1})
        expect(response).toEqual(expect.any(Object))
    })
})