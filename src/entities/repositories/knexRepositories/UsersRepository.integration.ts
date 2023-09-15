import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../../../sql/knex";
import { UserRepository } from "./UserRepository";

type typeSuit = {
    suit: UserRepository
}

const makeSuit = (): typeSuit => {
	const suit = new UserRepository();
	return {
		suit,
	};
};

describe("repository users tests integrations  by knex", () => {

	beforeEach(()=>{
		vi.useFakeTimers();
	});

	afterEach(async  () => {
		await db("extratos").del();
		await db("users").del();
		vi.useRealTimers();
	});

	it("should create user", async () => {
		const { suit } = makeSuit();
		const input = {
			name: "test",
			username: "testname",
			password: "12345678",
			nasc: "02-10-2003",
			saldo: 500,
			cpf: "2156216365252",
			email: "test@test.com",
			typeaccont: "poupanca",
			agencia: "001",
			numero: 101,
		};

		await suit.createUser(input);
		const user = await db("users").first();
		expect(user.id).toBeDefined();
		expect(user.name).toEqual(input.name);
		expect(user.username).toEqual(input.username);
		expect(user.email).toEqual(input.email);
		expect(user.cpf).toEqual(input.cpf);
		expect(user.password).toEqual(input.password);
		expect(user.nasc).toBeDefined();
		expect(user.saldo).toEqual(input.saldo);
		expect(user.typeaccont).toEqual(input.typeaccont);
		expect(user.agencia).toEqual(input.agencia);
		expect(user.keypix).toBeNull();
	});

	it("should be able to search for a user by username.", async () => {
		const { suit } = makeSuit();
		const input = {
			name: "test",
			username: "testname",
			password: "12345678",
			nasc: "02-10-2003",
			saldo: 500,
			cpf: "2156216365252",
			email: "test@test.com",
			typeaccont: "poupanca",
			agencia: "001",
			numero: 101,
		};
		await db("users").insert(input);

		const user = await suit.findUserByUsername("testname");
		expect(user.id).toBeDefined();
		expect(user.name).toEqual(input.name);
		expect(user.username).toEqual(input.username);
		expect(user.email).toEqual(input.email);
		expect(user.cpf).toEqual(input.cpf);
		expect(user.password).toEqual(input.password);
		expect(user.nasc).toBeDefined();
		expect(user.saldo).toEqual(input.saldo);
		expect(user.typeaccont).toEqual(input.typeaccont);
		expect(user.agencia).toEqual(input.agencia);
		expect(user.keypix).toBeNull();
	});
});