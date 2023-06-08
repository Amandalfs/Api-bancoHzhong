import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { DepositTransactionsUseCase } from "../DepositTransactionsUseCase";
import { hash } from 'bcrypt';
import { InvalidValueError } from "../../../errors/InvalidValueError";

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: DepositTransactionsUseCase;

describe("Testando o useCase DepositTransactions", ()=>{    

    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new DepositTransactionsUseCase(usersRepository, extractsRepository);

    })
    
    it("Usuario nao pode depositar valores invalidos", async ()=>{
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

        await expect(sut.execute({deposit: -50, id:1})).rejects.toEqual(new InvalidValueError())
    })

    it("Usuario deve conseguir depositar um valor valido na sua conta", async()=>{      
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

        const response = await sut.execute({deposit: 15, id:1});
        expect(response).toEqual(expect.any(Object));
        expect(response.extratoNew.saldo).toEqual(15);
    })
})