import { describe, beforeEach, afterEach, it, expect, beforeAll } from "vitest"
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../CreateUserUseCase";
import { AppError } from "../../../../../utils/AppError";

describe("criacao de usuarios",()=>{

    it("Usuario deve conseguir criar uma conta", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const usuario = {
            "username": "UsuarioTest",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }

        const user = await createUserUseCase.execute(usuario);
        expect(user.user).toEqual('created')
    })
    
    it("Nao deve conseguir criar uma conta com um email ja existente", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const usuario = {
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }
        
        const usuario2 = {
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "18349814098"
        }

        await createUserUseCase.execute(usuario)

        await expect(createUserUseCase.execute(usuario2)).rejects.toEqual(new AppError("Ja existente uma conta com esse Email"))
     

    })

     
    it("Nao deve conseguir criar uma conta com um cpf ja existente", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const usuario = {
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }
        
        const usuario2 = {
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }

        await createUserUseCase.execute(usuario)

        await expect(createUserUseCase.execute(usuario2)).rejects.toEqual(new AppError("Ja existente uma conta com esse Cpf"))
     

    })

    it("Nao deve conseguir criar uma conta com um username ja existente", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const usuario = {
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }
        
        const usuario2 = {
            "username": "Usuario Test",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "18349814098"
        }

        await createUserUseCase.execute(usuario)

        await expect(createUserUseCase.execute(usuario2)).rejects.toEqual(new AppError("Ja existente uma conta com esse Username"))
     

    })

    it("Nao deve conseguir criar uma conta senhas diferentes", async ()=>{
        const usersRepository = new InMemoryUsersRepository;
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const usuario = {
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }
        
        const usuario2 = {
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": "12345678",
            "password2": "123456jivjoasdfbvas",
            "cpf": "18349814098"
        }

        await createUserUseCase.execute(usuario)

        await expect(createUserUseCase.execute(usuario2)).rejects.toEqual(new AppError("Senhas Diferentes"))
     

    })

})