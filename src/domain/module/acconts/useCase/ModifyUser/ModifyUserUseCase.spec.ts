import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { ModifyUserUseCase } from "./ModifyUserUseCase";
import { CodificadorAdapterCrypto } from './../../../../../utils/Codificador/CodificadorAdapterCrypto';
import { ResourceNotFoundError } from "../ShowUser/errors";
import { AccontExistsError } from "../CreateUser/errors";
import { PasswordInvalidError } from "./errors/PasswordInvalidError";
import { FieldNotFilledError } from "./errors/FieldNotFilledError.";


const makeSuit = ()=>{
    const repository = new InMemoryUsersRepository();
    const cod = new CodificadorAdapterCrypto();
    const suit = new ModifyUserUseCase(repository, cod);
    return {
        repository,
        suit,
        cod
    }
} 
describe("tests units modify user", ()=>{

    it("should be able to change the user's name", async ()=>{
        const { suit, repository, cod } = makeSuit();

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
            name:  "new name",
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.name).toEqual(newUser.name);
    })

    it("should be able to change the user's username", async ()=>{
        const { suit, repository, cod } = makeSuit();

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
            username:  "new Username",
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.username).toEqual(newUser.username);
    })

    it("should be able to change the user's email", async ()=>{
        const { suit, repository } = makeSuit();

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "12345678",
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
            email:  "new email",
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.email).toEqual(newUser.email);
    })

    it("should be able to change the user's password", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
           odlPassword: "12345678",
           password: "123456789"
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.email).toBeDefined();
        expect(newDatas.name).toBeDefined();
        expect(newDatas.username).toBeDefined();
    })

    it("should throw an error if the user does not exist",async ()=>{
        const { suit, repository, cod } = makeSuit();   

        const newUser = {
           oldPassword: "12345678",
           password: "123456789"
        }

        const id = 1;
        await expect(suit.execute({ userUpdate: newUser, id})).rejects.toEqual(new ResourceNotFoundError());

    })

    it("should throw an error if the username already exists", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const passwordHashed2 = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed2,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
           username: "Usuario Test2"
        }

        const id = 1;
        await expect(suit.execute({ userUpdate: newUser, id})).rejects.toEqual(new AccontExistsError("username"));
    
    })

    it("should throw an error if the email already exists", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const passwordHashed2 = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test2",
            "name": "Usuario Test2",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario578@test.com",
            "password": passwordHashed2,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
           email: "usuario578@test.com"
        }

        const id = 1;
        await expect(suit.execute({ userUpdate: newUser, id})).rejects.toEqual(new AccontExistsError("email"));
    
    })


    it("should throw an error if the password is invalid", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
           oldPassword: "12345678ersdvd",
           password: "123456789"
        }

        const id = 1;
        await expect(suit.execute({ userUpdate: newUser, id})).rejects.toEqual(new PasswordInvalidError());
    })

    it("should throw an error if no field is sent to the modify user use case.", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const userUpdate = {}
        await expect(
            suit.execute({
                id: 1,
                userUpdate
            })
        ).rejects.toEqual(new FieldNotFilledError());
    })

    it("should be able to change all the data at once", async ()=>{
        const { suit, repository, cod } = makeSuit();

        const passwordHashed = await cod.criptografia("12345678", 10);

        repository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": passwordHashed,
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        })

        const newUser = {
           odlPassword: "12345678",
           password: "123456789",
           username: "new Username",
           name: "new name",
           email: "new email"
        }

        const id = 1;
        
        const newDatas = await suit.execute({ userUpdate: newUser, id});
        expect(newDatas.email).toBeDefined();
        expect(newDatas.name).toBeDefined();
        expect(newDatas.username).toBeDefined();
    })
});