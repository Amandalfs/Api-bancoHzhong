import  request  from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "../../../../app";

let server;
describe('testando o usuario conseguir pega suas informacoes', ()=>{
    beforeAll(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })

    it('usuario deve consegui acessar a rota de show user', async () =>{ 
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
        const response = await request(server)
            .get("/users/show")
            .set('Authorization', `Bearer ${responseSessions.body.params.token}`);
        expect(response.body.params.userSend).toEqual(expect.objectContaining({
            name: 'Usuario Test',
            username: 'UsuarioTest',
            saldo: 0,
            typeaccont: 'poupanca',
            keypix: null
        }))
    })
})