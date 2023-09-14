import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../../app";
import request from "supertest";

let server;
describe("testando a rota de criar usuarios", ()=>{
	beforeAll(()=>{
		server = app.listen();
	});

	afterAll(()=>{
		server.close();
	});

	it("deve ser possivel cadastrar um usuario", async ()=>{
		const response = await request(server)
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
			});
		expect(response.statusCode).toEqual(201);
		expect(response.body.msg).toEqual("created");
        
	});
});