import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { WithdrawTransactionsUseCase } from "../WithdrawTransactionsUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";
import { LimitError } from "../../../errors/LimitError";
import { LimitDayError } from "../../../errors/LimitDayError";
import { InvalidValueError } from "../../../errors/InvalidValueError";

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

        await expect(sut.execute(-50, 1)).rejects.toEqual(new InvalidValueError())
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
        await expect(sut.execute(350, 1)).rejects.toEqual(new LimitError(300, "poupanca")) // valor, id        

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

        await expect(sut.execute(900, 1)).rejects.toEqual(new LimitError(800, "corrente")) // valor, id        

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
        await expect(sut.execute(600, 1)).rejects.toEqual(new LimitError(450, "universitaria")) // valor, id        

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

        await expect(sut.execute(280, 1)).rejects.toEqual(new LimitDayError(1500, "poupanca")) // valor, id        

    })

    it("usuarios do tipo de conta corrente nao poderar sacar mais que o seu limite diario", async()=>{
        const senhaCriptografada = await hash("12345678", 8)
        // Limite de conta diaria: 4000

        vi.setSystemTime(new Date(2023, 4, 30, 10));

        const tipoDeConta = "corrente"
        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 5000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": tipoDeConta,
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        for (let index = 0; index < 5; index++) {
            await sut.execute(800, 1);
        }

        await expect(sut.execute(280, 1)).rejects.toEqual(new LimitDayError(4000, "corrente")) // valor, id        

    })

    it("usuarios do tipo de conta corrente nao poderar sacar mais que o seu limite diario", async()=>{
        const senhaCriptografada = await hash("12345678", 8)
        // Limite de conta diaria: 2250

        vi.setSystemTime(new Date(2023, 4, 30, 10));
        const tipoDeConta = "universitaria"

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 5000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": tipoDeConta,
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        for (let index = 0; index < 5; index++) {
            await sut.execute(450, 1);
        }

        await expect(sut.execute(280, 1)).rejects.toEqual(new LimitDayError(2250, "universitaria")) // valor, id        

    })
})