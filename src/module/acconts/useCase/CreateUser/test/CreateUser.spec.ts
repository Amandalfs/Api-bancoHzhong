import { describe, beforeEach, it, expect, vi, afterEach } from "vitest"
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../CreateUserUseCase";
import { AccontExistsError , ConfirmationPasswordInvalidError, InvalidCpfError, UserUnder18YearsOldError} from "../errors";
import { verifyAge } from "../../../../../utils/verify/verifyAge";
import { ValidarCpf } from "../../../../../utils/verify/validarCpf";
import { CodificadorAdapterCrypto } from './../../../../../utils/Codificador/CodificadorAdapterCrypto';

let usersRepository: InMemoryUsersRepository;
let VerifyAge: verifyAge;
let validarCpf: ValidarCpf;
let codificador: CodificadorAdapterCrypto; 
let sut: CreateUserUseCase;

describe("criacao de usuarios",()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        VerifyAge = new verifyAge;
        validarCpf = new ValidarCpf;
        codificador = new CodificadorAdapterCrypto;
        sut = new CreateUserUseCase(usersRepository, VerifyAge, validarCpf, codificador);
        vi.useFakeTimers();
    })

    afterEach(()=>{
        vi.useRealTimers();
    })

    it("Usuario deve conseguir criar uma conta", async ()=>{
        

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

        const user = await sut.execute(usuario);
        expect(user.user).toEqual('created')
    })
    
    it("Nao deve conseguir criar uma conta com um email ja existente", async ()=>{
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

        await sut.execute(usuario)

        await expect(sut.execute(usuario2)).rejects.toEqual(new AccontExistsError("Email"))
     

    })

     
    it("Nao deve conseguir criar uma conta com um cpf ja existente", async ()=>{
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

        await sut.execute(usuario)

        await expect(sut.execute(usuario2)).rejects.toEqual(new AccontExistsError("Cpf"))
     

    })

    it("Nao deve conseguir criar uma conta com um username ja existente", async ()=>{
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

        await sut.execute(usuario)

        await expect(sut.execute(usuario2)).rejects.toEqual(new AccontExistsError("Username"))
     
    })

    it("Nao deve conseguir criar uma conta senhas diferentes", async ()=>{
        const usuario2 = {
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": "12345678",
            "password2": "12345678rwthfnr",
            "cpf": "18349814098"
        }

        await expect(sut.execute(usuario2)).rejects.toEqual(new ConfirmationPasswordInvalidError());
     

    })

    it("Nao deve conseguir criar uma conta cpf invalido", async ()=>{
        const usuario2 = {
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario58@test.com",
            "password": "12345678",
            "password2": "12345678rwthfnr",
            "cpf": "1111111111"
        }
                
        await expect(sut.execute(usuario2)).rejects.toEqual(new InvalidCpfError());
    })

    it("Nao deve conseguir criar uma conta sendo menor de idade", async ()=>{
        vi.setSystemTime(new Date(2023,2,1,10));

        const usuario = {
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2008",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "password2": "12345678",
            "cpf": "12603863096"
        }

        await expect(sut.execute(usuario)).rejects.toEqual(new UserUnder18YearsOldError());
     

    })

})