import  request  from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "../../../../app";

let server;
describe("modify user controller test e2e", ()=>{
    beforeAll(()=>{
        server = app.listen();
    })

    afterAll(()=>{
        server.close();
    })

    it("should be able to access the route for modifying the user.", async () =>{ 
        await request(server)
            .post("/users")
            .set("password", "12345678")
            .set("passwordconfirmation", "12345678")
            .set("cpf", "12603863096")
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
            .patch("/users/modify")
            .set("Authorization", `Bearer ${responseSessions.body.params.token}`)
            .send({
                username: "new username",
                name: "new name",
                email: "new email",
                oldPassword: "12345678",
                password: "new password",
            })
        expect(response.body.params).toEqual(expect.objectContaining({
            name: "new name",
            username: "new username",
            email: "new email",
        }));
        expect(response.status).toEqual(200);
    })
})