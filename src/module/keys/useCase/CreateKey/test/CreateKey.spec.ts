import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { CreateKeyUseCase } from "../CreateKeyUseCase";
import { hash } from 'bcrypt';
import { keyGenerator } from "../../../../../utils/keyGenerator";
import { AppError } from "../../../../../utils/AppError";

describe("Teste de create key", ()=>{


    it("Usuario nao pode criar uma chave se ele ja estiver uma", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createKeyUseCase = new CreateKeyUseCase(usersRepository);

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

        const ChaveGerada =  await keyGenerator()
        await usersRepository.createKeyPixById(1, ChaveGerada);

        await expect(createKeyUseCase.execute(1)).rejects.toEqual(new AppError("Chave pix Ja existe"))
    })
})
