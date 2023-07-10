import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import request from "supertest";
import"dotenv/config"

let server;
describe('Testando a rota de fazer login',()=>{
    beforeAll(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })

    it("deve ser possivel logar com a conta certa e poder receber o seu token", async()=>{
        console.log(process.env.DATABASE_URL)
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
        const response = await request(server)
            .post("/users/sessions")
            .send({
                username: "UsuarioTest",
                password: "12345678",
            })
        expect(response.status).toEqual(200);
        expect(response.body.params).toEqual({
            token: expect.any(String)
        });
    })

})

