import { app } from "../../../../app";
import { describe, beforeEach, afterEach, it } from "vitest"
import request from "supertest"
import {execSync} from "child_process"

describe("criacao de usuarios",()=>{

    beforeEach(()=>{
        execSync("npm run knex -- migrate:latest")
    })

    
    afterEach(()=>{
        execSync("npm run knex -- migrate:rollback --all")
    })

    it("Deverar criar um usuario",async()=>{
        const server = app.listen(2000,()=>{
            console.log("rodando")
        });
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
    })
})