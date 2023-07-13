import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import request from "supertest"

let server;
describe('Testando a rota de depositar', ()=>{

    beforeAll(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })

    it("Deve ser possivel o usuario conseguir deposita na sua conta", async()=>{
        await request(server)
            .post("/users")
            .set('password', "12345678")
            .set('passwordconfirmation', "12345678")
            .set('cpf', "12603863096")
            .send({
                username: "UsuarioTest",
                name: "Usuario Test",
                nasc: "02-10-2003",
                typeaccont: "poupanca",
                email: "usuario57@test.com",
        })

        const responseSessions = await request(server)
            .post("/users/sessions")
            .send({
                username: "UsuarioTest",
                password: "12345678",
            })

        const { body, statusCode} = await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessions.body.params.token}`)
            .send({
                deposit: 500,
            })
        expect(statusCode).toEqual(200);
        expect(body.params).toEqual(expect.objectContaining({
            name: "Usuario Test",
            tipo: "deposito",
            saldo: 500,
        }))
    })
})