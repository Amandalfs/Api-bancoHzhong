import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { SessionsUsersUseCase } from "../SessionsUsersUseCase";
import { hash } from 'bcrypt';
import { PassordOrUsernameInvalidError } from "../errors";

let usersRepository: InMemoryUsersRepository;
let sut: SessionsUsersUseCase;

describe('Testando Login de usuario',()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        sut = new SessionsUsersUseCase(usersRepository);

    })

    it("usuario nao deve conseguir logar com um a senha errada", async()=>{

        const senhaCriptografada = await hash("12345678", 8);

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
        await expect(sut.execute({username:"UsarioTest", password:"524545"})).rejects.toEqual(new PassordOrUsernameInvalidError());

        

    })

    it("Usuario nao pode logar com uma conta que nao existe", async ()=>{
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
        await expect(sut.execute({username:"Uggbfri0bnaeipbijrth", password:"12345678"})).rejects.toEqual(new PassordOrUsernameInvalidError());
    })

    it("Usuario deve conseguir iniciar uma sessao com username e senha certa", async()=>{
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
        const user = {
            username: "UsuarioTest",
            password:"12345678"
        }

        const token = await sut.execute(user);

        expect(token).toEqual(expect.any(String))

    })
})