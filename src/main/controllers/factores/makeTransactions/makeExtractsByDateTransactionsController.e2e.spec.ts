import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { app } from "../../../../app";
import request from "supertest";

let server;
describe('Teste de rota de monstrar extratos', ()=>{
    
    beforeEach(()=>{
        server = app.listen();
        vi.useFakeTimers();
    })

    afterEach(()=>{
        server.close();
        vi.useRealTimers();
    })

    it("Deve ser possivel monstrar os extratos do usuario de acordo com a data", async()=>{
        vi.setSystemTime(new Date(2023, 1, 1))

        await request(server)
            .post("/users")
            .set('password', "12345678")
            .set('passwordconfirmation', "12345678")
            .set('cpf', "05154964055")
            .send({
                username: "UsuarioTest2",
                name: "Usuario Test2",
                nasc: "02-10-2003",
                typeaccont: "poupanca",
                email: "usuario58@test.com",
        });

        const responseSessionsReceive = await request(server)
            .post("/users/sessions")
            .send({
                username: "UsuarioTest2",
                password: "12345678",
            });
        
        const responseKeyReceive = await request(server)
            .post("/users/keys")
            .set('Authorization', `Bearer ${responseSessionsReceive.body.params.token}`);

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
            });
        
        const responseSessionsSending = await request(server)
            .post("/users/sessions")
            .send({
                username: "UsuarioTest",
                password: "12345678",
            });

        await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                deposit: 500,
            });

        await request(server)
            .patch("/transactions/withdraw")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                withdraw: 200,
            });

        await request(server)
            .patch("/transactions/sendingMoney")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                keypix: responseKeyReceive.body.params.key,
                value: 300,
            });
        
        const dateStart = new Date(2022, 11, 1);
        const dateEnd = new Date(2023, 2, 1);

        const { statusCode, body}= await request(server)
            .get(`/transactions/extracts?dateStart=${dateStart}&dateEnd=${dateEnd}`)
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
        expect(statusCode).toEqual(200);
        expect(body.params.extracts[0]).toEqual(expect.objectContaining({
            tipo: "deposito",
            saldo: 500,
            descricao: 'Voce depositou R$500,00',
        }))
        expect(body.params.extracts).toHaveLength(3);
        expect(body.params.details.page).toEqual(1);
        expect(body.params.details.pagesTotal).toEqual(1);
        
    })
})