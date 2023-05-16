import { execSync } from "child_process";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../../../app";
import  request  from "supertest"

describe('Testando Login de usuario',()=>{
    beforeEach(()=>{
        execSync("npm run knex -- migrate:latest")
    })

    afterEach(()=>{
        execSync("npm run knex --  migrate:rollback --all")
    })

    it("usuario nao deve conseguir logar com um a senha errada", async()=>{
        const server = app.listen();
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
        const response = await request(server)
            .get("/users")
            .send({
                "username": "UsuarioTest",
                "password": "4815415213"
            })  
        const result = JSON.parse(response.text)
        console.log(result.message)
        expect(result.message).toEqual("Senha Ou Username digitada esta errada")
        server.close()
    })

    it("Usuario nao pode logar com uma conta que nao existe", async ()=>{
        const server = app.listen();
        const response = await request(server)
            .get("/users")
            .send({
                "username": "UsarioTest",
                "password": "524545"
            })
        const result = JSON.parse(response.text)
        expect(result.message).toEqual("Senha Ou Username digitada esta errada")
        server.close()
    })

    it("Usuario deve conseguir iniciar uma sessao com username e senha certa", async()=>{
        const server = app.listen();
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
        await request(server)
            .get("/users")
            .send({
                "username": "UsuarioTest",
                "password": "12345678"
            })
        .expect(202)  
        server.close()
    })
})