import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { app } from "../../../../app";
import request from "supertest";

let server: any;
describe("grafic extracts column by day test e2e", async ()=>{

    beforeEach(()=>{
        server = app.listen();
        vi.useFakeTimers();
    })

    afterAll(()=>{
        server.close();
        vi.useRealTimers();
    })


    it("should be able to access their grafic column by day pizza route.", async ()=>{
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
        
        vi.setSystemTime(new Date(2023, 1, 1))

        await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                deposit: 500,
            });
        
        await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                deposit: 300,
            });
        
        
        await request(server)
            .patch("/transactions/sendingMoney")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                keypix: responseKeyReceive.body.params.key,
                value: 300,
            });
        
        vi.setSystemTime(new Date(2023, 1, 2))

        await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                deposit: 500,
            });
            
        await request(server)
            .patch("/transactions/deposit")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                deposit: 100,
            });
        
    
        await request(server)
            .patch("/transactions/sendingMoney")
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`)
            .send({
                keypix: responseKeyReceive.body.params.key,
                value: 150,
            });
            
        
    
        const { statusCode, body } = await request(server)
            .get(`/transactions/grafic/column-day?startDate=${new Date(2023, 1, 1)}&endDate=${new Date(2023,1,15)}`)
            .set('Authorization', `Bearer ${responseSessionsSending.body.params.token}`);

        expect(statusCode).toEqual(200);
        expect(body.params.revenues).toHaveLength(2);           
        expect(body.params.revenues[0].value).toEqual(800);
        expect(body.params.revenues[1].value).toEqual(600);
        expect(body.params.revenues[0].date).toBeDefined();
        expect(body.params.expenses).toHaveLength(2);
        expect(body.params.expenses[0].value).toEqual(300);
        expect(body.params.expenses[1].value).toEqual(150);
        expect(body.params.expenses[0].date).toBeDefined();
    })
});