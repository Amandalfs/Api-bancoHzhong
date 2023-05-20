import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { WithdrawTransactionsUseCase } from "../WithdrawTransactionsUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";

describe("Testando saque do usaurio", ()=>{

    it("usuario nao deve poder sacar valor de zero ou negativo", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;

        const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(usersRepository, extractsRepository);

        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 500, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await expect(withdrawTransactionsUseCase.execute(-50, 1)).rejects.toEqual(new AppError("Saldo invalido"))
    })

    it("Usuario nao pode sacar um valor maior que seu saldo", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;

        const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(usersRepository, extractsRepository);

        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 500, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await expect(withdrawTransactionsUseCase.execute(900, 1)).rejects.toEqual(new AppError("Saldo insuficiente para fazer saque"))

    })

    it("usuario deve conseguir sacar da sua conta", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;

        const withdrawTransactionsUseCase = new WithdrawTransactionsUseCase(usersRepository, extractsRepository);

        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 500, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        const response = await withdrawTransactionsUseCase.execute(200, 1) // valor, id
        expect(response).toEqual(expect.any(Object));        

    })

})