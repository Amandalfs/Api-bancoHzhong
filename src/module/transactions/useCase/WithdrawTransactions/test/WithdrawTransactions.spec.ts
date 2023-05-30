import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { WithdrawTransactionsUseCase } from "../WithdrawTransactionsUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";

let usersRepository:  InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: WithdrawTransactionsUseCase;

describe("Testando saque do usaurio", ()=>{

    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new  WithdrawTransactionsUseCase(usersRepository, extractsRepository);

        vi.useFakeTimers();
    })

    afterEach(()=>{
        vi.useRealTimers();
    })

    it("usuario nao deve poder sacar valor de zero ou negativo", async()=>{
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

        await expect(sut.execute(-50, 1)).rejects.toEqual(new AppError("Saldo invalido"))
    })

    it("Usuario nao pode sacar um valor maior que seu saldo", async ()=>{
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

        await expect(sut.execute(900, 1)).rejects.toEqual(new AppError("Saldo insuficiente para fazer saque"))

    })

    it("usuario deve conseguir sacar da sua conta", async()=>{
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

        const response = await sut.execute(200, 1) // valor, id
        expect(response).toEqual(expect.any(Object));        

    })

    it("usuario do tipo poupanca nao deve conseguir sacar um valor maior que seu limite de saque por vez", async()=>{
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

        await expect(sut.execute(350, 1)).rejects.toEqual(new AppError("O seu limite por saque é de R$300")) // valor, id        

    })

    it("usuario do tipo corrente nao deve conseguir sacar um valor maior que seu limite de saque por vez", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 3000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "corrente",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await expect(sut.execute(900, 1)).rejects.toEqual(new AppError("O seu limite por saque é de R$800")) // valor, id        

    })

    it("usuario do tipo universitaria nao deve conseguir sacar um valor maior que seu limite de saque por vez", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 3000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "universitaria",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await expect(sut.execute(600, 1)).rejects.toEqual(new AppError("O seu limite por saque é de R$450")) // valor, id        

    })

    it("usuarios do tipo de conta poupanca nao poderar sacar mais que o seu limite diario", async()=>{
        const senhaCriptografada = await hash("12345678", 8)
        // Limite de conta diaria: 1500

        vi.setSystemTime(new Date(2023, 4, 30, 10));

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 3000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        for (let index = 0; index < 5; index++) {
            await sut.execute(300, 1);
        }

        await expect(sut.execute(280, 1)).rejects.toEqual(new AppError("Voce atingiu seu limite diario!")) // valor, id        

    })

})