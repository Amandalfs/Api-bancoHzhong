import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { DeleteKeyUseCase } from "../DeleteKeyUseCase";
import { hash } from "bcrypt";
import { KeyGeneratorAdapterCrypto } from "../../../../../../utils/keyGenerator";
import { KeyDoesNotExistError, ResourceNotFoundError } from "../errors";

let usersRepository: InMemoryUsersRepository;
let sut: DeleteKeyUseCase;

describe("Testando o DeleteUser", ()=>{
	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository;
		sut = new DeleteKeyUseCase(usersRepository);
	});

	it("Usuario nao deve conseguir deleta a chave dele que nao existe", async ()=>{
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

		await expect(sut.execute({id:1})).rejects.toEqual(new KeyDoesNotExistError());
	});

	it("Usuario deve conseguir deleta a chave dele que existe", async ()=>{
		const keyGenerator = new KeyGeneratorAdapterCrypto();
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

		const keyDelete = await keyGenerator.execute();
		await usersRepository.createKeyPixById(1, keyDelete);
    
		const response = sut.execute({id: 1});
		await expect(response).toEqual(expect.any(Object));
	});

    
	it("Usuario sem Id existe nao poderar deletar uma chave", async ()=>{
		await expect(sut.execute({id: 1})).rejects.toEqual(new ResourceNotFoundError());
	});
});