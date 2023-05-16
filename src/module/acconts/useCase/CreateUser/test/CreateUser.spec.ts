import { app } from "../../../../../app";
import { describe, beforeEach, afterEach, it, expect } from "vitest"
import request from "supertest"
import {execSync} from "child_process";

describe("criacao de usuarios",()=>{

    beforeEach(()=>{
        execSync("npm run knex -- migrate:latest")
    })
    afterEach(()=>{
        execSync("npm run knex -- migrate:rollback --all")
    })

    it("Deverar criar um usuario",async()=>{
        const server = app.listen(()=>{});
        await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "12603863096"
            })
        .expect(201)

        server.close()
    })

    it("Um usario nao deve conseguir criar uma conta com um email ja existente", async()=>{
        const server = app.listen(2000,()=>{});

        await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "12603863096"
            })

        const result = await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest2",
                "name": "Usuario Test2",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "56711478088"
            })
        const dados = JSON.parse(result.text)
        console.log(dados.message)
        expect(dados.message).toEqual("Ja existente uma conta com esse Email");
        server.close()
    })
        
    it("Deve nao pode cadastrar com um username ja existente", async()=>{
        const server = app.listen(2000,()=>{});

        await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "12603863096"
            })

        const result = await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test2",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario58@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "56711478088"
            })
        const dados = JSON.parse(result.text)
        console.log(dados.message)
        expect(dados.message).toEqual("Ja existente uma conta com esse Username");
        server.close()
    })

    it("usuario nao poderar cadastrar com um cpf ja existe", async()=>{
        const server = app.listen(2000,()=>{});

        await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "56711478088"
            })

        const result = await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest2",
                "name": "Usuario Test2",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario58@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "56711478088"
            })
        const dados = JSON.parse(result.text)
        console.log(dados.message)
        expect(dados.message).toEqual("Ja existente uma conta com esse Cpf");
        server.close()
    })

    it("usuario noa poderar cadastar com as senhas diferentes", async()=>{
        const server = app.listen(2000,()=>{});

        await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest",
                "name": "Usuario Test",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario57@test.com",
                "password": "12345678",
                "password2": "12345678",
                "cpf": "12603863096"
            })

        const result = await request(server)
            .post("/users")
            .send({
                "username": "UsuarioTest2",
                "name": "Usuario Test2",
                "nasc": "02-10-2003",
                "typeaccont": "poupanca",
                "email": "usuario58@test.com",
                "password": "123456715",
                "password2": "12345678",
                "cpf": "56711478088"
            })
        const dados = JSON.parse(result.text)
        console.log(dados.message)
        expect(dados.message).toEqual("Senhas Diferentes");
        server.close()
    })
})