import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { DepositTransactionsUseCase } from "../DepositTransactionsUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";

describe("Testando o useCase DepositTransactions", ()=>{
    
    it("Usuario nao pode depositar valores invalidos", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const depositTransactionsUseCase = new DepositTransactionsUseCase(usersRepository, extractsRepository);

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

        await expect(depositTransactionsUseCase.execute({deposit: -50, id:1})).rejects.toEqual(new AppError("Saldo invalido"))
    })

    it("Usuario deve conseguir depositar um valor valido na sua conta", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const depositTransactionsUseCase = new DepositTransactionsUseCase(usersRepository, extractsRepository);
        
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

        const response = await depositTransactionsUseCase.execute({deposit: 15, id:1});
        expect(response).toEqual(expect.any(Object));
    })
})