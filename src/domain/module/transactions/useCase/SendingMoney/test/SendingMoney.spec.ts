import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryUsersRepository } from "../../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../../entities/repositories/inMemory/InMemoryExtractsRepository";

import { SendingMoneyUseCase } from "../SendingMoneyUseCase";

import { hash } from "bcrypt";

import { CannotSendMoneyToYourAccountError, InvalidPixKeyError, BalanceInsuficientError, 
	InvalidValueError, LimitDayError, LimitError, ResourceNotFoundError } from "../errors";

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: SendingMoneyUseCase;

describe("Testando o envio de dinheiro para outro usuario", ()=>{
    
	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository;
		extractsRepository = new InMemoryExtractsRepository;
		sut = new SendingMoneyUseCase(usersRepository, extractsRepository);
		vi.useFakeTimers();
	});

	afterEach(()=>{
		vi.useRealTimers();
	});

	it("usaurio nao pode enviar dinheiro maior que seu saldo", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096"
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:15})).rejects.toEqual(new BalanceInsuficientError());
	});

	it("usaurio nao pode mandar dinheiro para um conta que nao existe", async ()=>{        
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";
		await expect(sut.execute({id, keyPix, value:25})).rejects.toEqual(new InvalidPixKeyError());
	});

	it("usuario nao poderar enviar dinheiro para ele mesmo", async ()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
			keypix: "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL",
		});

        
		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:50})).rejects.toEqual(new CannotSendMoneyToYourAccountError());

	});

	it("O usuario nao poderar enviar saldo negativo para outro usuario", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:-15})).rejects.toEqual(new InvalidValueError());
	});

	it("usuario deve conseguir enviar o dinheiro para outro usuario", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		const response = await sut.execute({id, keyPix, value:50});
		expect(response).toEqual(expect.any(Object));
	});

	it("usuarios com conta poupanca nao deve conseguir fazer um envio maior que R$300", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:350})).rejects.toEqual(new LimitError(300, "poupanca"));
	});

	it("usuarios com conta corrente nao deve conseguir fazer um envio maior que R$800", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 2000, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "corrente",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:850})).rejects.toEqual(new LimitError(800, "corrente"));
	});

	it("usuarios com conta universitaria nao deve conseguir fazer um envio maior que R$450", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 2000, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "universitaria",
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		await expect(sut.execute({id, keyPix, value:500})).rejects.toEqual(new LimitError(450, "universitaria"));
	});

	it("usuarios do tipo de conta poupanca nao poderar enviar mais que o seu limite diario", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		vi.setSystemTime(new Date(2023, 4, 30, 10));
		const tipoDeConta = "poupanca";

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 4500, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": tipoDeConta,
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";
		for (let index = 0; index < 5; index++) {
			await sut.execute({id, keyPix, value:290});
		}

		await expect(sut.execute({id, keyPix, value:290})).rejects.toEqual(new LimitDayError(1500, "poupanca")); // valor, id        

	});

	it("usuarios do tipo de conta corrente nao poderar enviar mais que o seu limite diario", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		vi.setSystemTime(new Date(2023, 4, 30, 10));
		const tipoDeConta = "corrente";

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 8000, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": tipoDeConta,
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		for (let index = 0; index < 5; index++) {
			await sut.execute({id, keyPix, value:800});
		}

		await expect(sut.execute({id, keyPix, value:790})).rejects.toEqual(new LimitDayError(4000, "corrente")); // valor, id        

	});

	it("usuarios do tipo de conta universitaria nao poderar enviar mais que o seu limite diario", async()=>{
		const senhaCriptografada = await hash("12345678", 8);

		vi.setSystemTime(new Date(2023, 4, 30, 10));
		const tipoDeConta = "universitaria";

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 8000, 
			"username": "UsuarioTest",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": tipoDeConta,
			"email": "usuario57@test.com",
			"password": senhaCriptografada,
			"cpf": "12603863096",
		});

		await usersRepository.createUser({
			numero: 153,
			agencia: "003",
			saldo: 0, 
			"username": "UsuarioTest2",
			"name": "Usuario Test",
			"nasc": "02-10-2003",
			"typeaccont": "poupanca",
			"email": "usuario58@test.com",
			"password": senhaCriptografada,
			"cpf": "48786518062", 
			"keypix": "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL"
		});

		const id = 1;
		const keyPix = "gkprjmbpoertpbnoefdoaBNM-FGNDRFBJESDNBFVOIL";

		for (let index = 0; index < 5; index++) {
			await sut.execute({id, keyPix, value:450});
		}

		await expect(sut.execute({id, keyPix, value:440})).rejects.toEqual(new LimitDayError(2250, "universitaria")); // valor, id        

	});

	it("usuario nao encontrado", async ()=>{
		await expect(sut.execute({id:1, keyPix:"ndfsvubssbpvbspi", value:50})).rejects.toEqual(new ResourceNotFoundError());
	});
});