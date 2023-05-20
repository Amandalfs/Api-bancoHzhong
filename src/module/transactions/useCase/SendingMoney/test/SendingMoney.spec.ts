import { describe, it, expect } from "vitest";
import { AppError } from "../../../../../utils/AppError";

import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";

import { SendingMoneyUseCase } from "../SendingMoneyUseCase";

import { hash } from 'bcrypt';


describe("Testando o envio de dinheiro para outro usuario", ()=>{
    
    it("usaurio nao pode enviar dinheiro maior que seu saldo", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const sendingMoneyUseCase = new SendingMoneyUseCase(usersRepository, extractsRepository);

        
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

        await expect(sendingMoneyUseCase.execute(id, keypix, 15)).rejects.toEqual(new AppError("Saldo Invalido para fazer o saque"))
    })

    it("usaurio nao pode mandar dinheiro para um conta que nao existe", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const sendingMoneyUseCase = new SendingMoneyUseCase(usersRepository, extractsRepository);
        
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
        await expect(sendingMoneyUseCase.execute(id, keypix, 25)).rejects.toEqual(new AppError("A Chave pix e invalida"))
    })

    it("usuario nao poderar enviar dinheiro para ele mesmo", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const sendingMoneyUseCase = new SendingMoneyUseCase(usersRepository, extractsRepository);

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

        await expect(sendingMoneyUseCase.execute(id, keypix, 50)).rejects.toEqual(new AppError("Voce nao pode enviar dinheiro para voce"))

    })

    it("O usuario nao poderar enviar saldo negativo para outro usuario", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const sendingMoneyUseCase = new SendingMoneyUseCase(usersRepository, extractsRepository);

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

        await expect(sendingMoneyUseCase.execute(id, keypix, -15)).rejects.toEqual(new AppError("Saldo Invalido, voce so pode mandar valores positivos"))
    })

    it("usuario deve conseguir enviar o dinheiro para outro usuario", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const sendingMoneyUseCase = new SendingMoneyUseCase(usersRepository, extractsRepository);

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

        const response = await sendingMoneyUseCase.execute(id, keypix, 50);
        expect(response).toEqual(expect.any(Object));
    })
})