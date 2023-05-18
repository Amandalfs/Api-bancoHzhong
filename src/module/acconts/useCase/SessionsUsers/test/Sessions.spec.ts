import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { SessionsUsersUseCase } from "../SessionsUsersUseCase";
import { hash } from 'bcrypt';
import { AppError } from "../../../../../utils/AppError";

describe('Testando Login de usuario',()=>{

    it("usuario nao deve conseguir logar com um a senha errada", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const sessionsUsersUseCase = new SessionsUsersUseCase(usersRepository)
        const senhaCriptografada = await hash("12345678", 8)

        usersRepository.createUser({
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
        await expect(sessionsUsersUseCase.execute("UsarioTest", "524545")).rejects.toEqual(new AppError("Senha Ou Username digitada esta errada", 401))

        

    })

    it("Usuario nao pode logar com uma conta que nao existe", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const sessionsUsersUseCase = new SessionsUsersUseCase(usersRepository)
        const senhaCriptografada = await hash("12345678", 8)

        usersRepository.createUser({
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
        await expect(sessionsUsersUseCase.execute("Uggbfri0bnaeipbijrth", "12345678")).rejects.toEqual(new AppError("Senha Ou Username digitada esta errada", 401))
    })

    it("Usuario deve conseguir iniciar uma sessao com username e senha certa", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const sessionsUsersUseCase = new SessionsUsersUseCase(usersRepository)
        const senhaCriptografada = await hash("12345678", 8)

        usersRepository.createUser({
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

        const token = await sessionsUsersUseCase.execute("UsuarioTest", "12345678")

        expect(token).toEqual(expect.any(String))

    })
})