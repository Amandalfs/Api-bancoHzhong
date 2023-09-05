import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import request from "supertest";

let server: any;
describe("metrics user test e2e", async ()=>{

    beforeEach(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })


    it("should be able to access their metrics route.", async ()=>{
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
            .patch("/transactions/sendingMoney")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                keypix: responseKeyReceive.body.params.key,
                value: 300,
            });
    
        const { statusCode, body } = await request(server)
            .get("/users/metrics")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`);
        expect(statusCode).toEqual(200);
        expect(body.params.monthlyIncome).toEqual(500);
        expect(body.params.monthlyExpenses).toEqual(300);
    })
});