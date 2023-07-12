import  request  from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "../../../../app";

let server;
describe('testando o usuario conseguir ver sua chave', ()=>{
    beforeAll(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })

    it('usuario deve consegui acessar a rota de monstrar chave', async () =>{ 
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

        await request(server)
            .post("/users/keys")
            .set('Authorization', `Bearer ${responseSessions.body.params.token}`);

        const response = await request(server)
            .get("/users/keys")
            .set('Authorization', `Bearer ${responseSessions.body.params.token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.params.key).toEqual(expect.any(String));
    })
})