import { describe, expect, it } from "vitest";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { ShowUserUseCase } from "../ShowUserUseCase";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { AppError } from "../../../../../utils/AppError";
import { hash } from 'bcrypt';


describe("Testando a funcionalidade show users", ()=>{

    it("Usuario nao deve conseguir usar show sem uma conta", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const showUserUseCase = new ShowUserUseCase(usersRepository, extractsRepository);
        await expect(showUserUseCase.execute(515)).rejects.toEqual(new AppError("Usuario nao encontrado"))
    })

    
    it("Usuario deve conseguir usar show com uma conta existente", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;

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

        const showUserUseCase = new ShowUserUseCase(usersRepository, extractsRepository);
        const response = await showUserUseCase.execute(1)
        expect(response).toEqual(expect.any(Object))
    })
})