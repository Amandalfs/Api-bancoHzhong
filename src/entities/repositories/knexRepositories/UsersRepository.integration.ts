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

	it("should be able to search for a user by id.", async () => {
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
		const [{ id }] = await db("users").insert(input).returning("id");

		const user = await suit.findUserById(id);
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
    
	it("should be able to search for a user by cpf.", async () => {
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

		const user = await suit.findUserByCPF(input.cpf);
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

	it("should be able to search for a user by email.", async () => {
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

		const user = await suit.findUserByEmail(input.email);
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

	it("should be able to search for a user by keypix.", async () => {
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
			keypix: "fclvbjdfivbdapbd",
		};
		await db("users").insert(input);

		const user = await suit.findUserByKeyPix(input.keypix);
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
		expect(user.keypix).toEqual(input.keypix);
	});

	it("should be able to change the account balance.", async () => {
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
			keypix: "fclvbjdfivbdapbd",
		};
		const [{ id }] = await db("users").insert(input).returning("id");

		await suit.updateBalanceById(id, 610);
		const user = await db("users").where("id", id).first();
		expect(user.saldo).toEqual(610);
	});

	it("should be able to create a Pix key.", async () => {
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
		const [{ id }] = await db("users").insert(input).returning("id");

		await suit.createKeyPixById(id,"fclvbjdfivbdapbd");
		const user = await db("users").where("id", id).first();
		expect(user.keypix).toEqual("fclvbjdfivbdapbd");
	});

	it("should be able to delete a Pix key.", async () => {
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
			keypix: "fclvbjdfivbdapbd",
		};
		const [{ id }] = await db("users").insert(input).returning("id");

		await suit.deleteKeyPixById(id);
		const user = await db("users").where("id", id).first();
		expect(user.keypix).toBeNull();
	});

    
	it("should be able to display the Pix key.", async () => {
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
			keypix: "fclvbjdfivbdapbd",
		};
		const [{ id }] = await db("users").insert(input).returning("id");

		const { keypix } = await suit.getKeyPixById(id);
		expect(keypix).toEqual(input.keypix);
	});
});