import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { AppError } from "../../../../../utils/AppError";

import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";

import { SendingMoneyUseCase } from "../SendingMoneyUseCase";

import { hash } from 'bcrypt';
import { LimitError } from "../../../errors/LimitError";
import { LimitDayError } from "../../../errors/LimitDayError";

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: SendingMoneyUseCase;

describe("Testando o envio de dinheiro para outro usuario", ()=>{
    
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new SendingMoneyUseCase(usersRepository, extractsRepository);
        vi.useFakeTimers();
    })

    afterEach(()=>{
        vi.useRealTimers();
    })

    it("usaurio nao pode enviar dinheiro maior que seu saldo", async()=>{
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

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, 15)).rejects.toEqual(new AppError("Saldo Invalido para fazer o saque"))
    })

    it("usaurio nao pode mandar dinheiro para um conta que nao existe", async ()=>{        
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
            "cpf": "12603863096"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        await expect(sut.execute(id, keypix, 25)).rejects.toEqual(new AppError("A Chave pix e invalida"))
    })

    it("usuario nao poderar enviar dinheiro para ele mesmo", async ()=>{
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
            keypix: "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL",
        });

        
        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, 50)).rejects.toEqual(new AppError("Voce nao pode enviar dinheiro para voce"))

    })

    it("O usuario nao poderar enviar saldo negativo para outro usuario", async()=>{
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

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, -15)).rejects.toEqual(new AppError("Saldo Invalido, voce so pode mandar valores positivos"))
    })

    it("usuario deve conseguir enviar o dinheiro para outro usuario", async()=>{
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

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        const response = await sut.execute(id, keypix, 50);
        expect(response).toEqual(expect.any(Object));
    })

    it("usuarios com conta poupanca nao deve conseguir fazer um envio maior que R$300", async()=>{
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

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, 350)).rejects.toEqual(new LimitError(300, "poupanca"));
    })

    it("usuarios com conta corrente nao deve conseguir fazer um envio maior que R$800", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 2000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "corrente",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, 850)).rejects.toEqual(new LimitError(800, "corrente"));
    })

    it("usuarios com conta universitaria nao deve conseguir fazer um envio maior que R$450", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 2000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "universitaria",
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        await expect(sut.execute(id, keypix, 500)).rejects.toEqual(new LimitError(450, "universitaria"));
    })

    it("usuarios do tipo de conta poupanca nao poderar enviar mais que o seu limite diario", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        vi.setSystemTime(new Date(2023, 4, 30, 10));
        const tipoDeConta = "poupanca"

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 2000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": tipoDeConta,
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        for (let index = 0; index < 5; index++) {
            await sut.execute(id, keypix, 290);
        }

        await expect(sut.execute(id, keypix, 290)).rejects.toEqual(new LimitDayError(1500, "poupanca")) // valor, id        

    })

    it("usuarios do tipo de conta corrente nao poderar enviar mais que o seu limite diario", async()=>{
        const senhaCriptografada = await hash("12345678", 8)

        vi.setSystemTime(new Date(2023, 4, 30, 10));
        const tipoDeConta = "corrente"

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 2000, 
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": tipoDeConta,
            "email": "usuario57@test.com",
            "password": senhaCriptografada,
            "cpf": "12603863096",
        });

        await usersRepository.createUser({
            numero: 153,
            agencia: "003",
            saldo: 0, 
            "username": "UsuarioTest2",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": senhaCriptografada,
            "cpf": "48786518062", 
            "keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
        });

        const id = 1
        const keypix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"

        for (let index = 0; index < 5; index++) {
            await sut.execute(id, keypix, 800);
        }

        await expect(sut.execute(id, keypix, 790)).rejects.toEqual(new LimitDayError(4000, "corrente")) // valor, id        

    })

})