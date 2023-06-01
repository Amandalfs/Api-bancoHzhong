import { describe, it, expect, beforeEach } from "vitest";
import { AppError } from "../../../../../utils/AppError";

import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";

import { SendingMoneyUseCase } from "../SendingMoneyUseCase";

import { hash } from 'bcrypt';

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: SendingMoneyUseCase;

describe("Testando o envio de dinheiro para outro usuario", ()=>{
    
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new SendingMoneyUseCase(usersRepository, extractsRepository);
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

        await expect(sut.execute(id, keypix, 350)).rejects.toEqual(new AppError("O limite da conta poupança é de R$300 por envio"));
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

        await expect(sut.execute(id, keypix, 850)).rejects.toEqual(new AppError("O limite da conta corrente é de R$800 por envio"));
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

        await expect(sut.execute(id, keypix, 500)).rejects.toEqual(new AppError("O limite da conta universitaria é de R$450 por envio"));
    })

})