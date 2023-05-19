import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { hash } from 'bcrypt';
import { ExtractsByDataUseCase } from "../ExtractsByDataUseCase";

describe("testando useCase de estrato", ()=>{

    it("usuario de conseguir acessar seu extrato de um tempo x a y", async()=>{
        const usersRepository = new InMemoryUsersRepository;
        const extractsRepository = new InMemoryExtractsRepository;
        const extractsByDate = new ExtractsByDataUseCase(extractsRepository);

        const senhaCriptografada = await hash("12345678", 8)

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
        const id_user = 1, dateStart = "02-02-2023", dateEnd = "02-04-2023"

        const extratos = await extractsByDate.execute(id_user, dateStart, dateEnd)
        console.log("Ola mundo", extratos)
        expect(extratos).toEqual(expect.any(Array))
    })
})