import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUsersRepository } from "../../../../../repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../repositories/inMemory/InMemoryExtractsRepository";
import { hash } from 'bcrypt';
import { ExtractsByDataUseCase } from "../ExtractsByDataUseCase";
import { date } from "../../../../../utils/date";

let usersRepository: InMemoryUsersRepository;
let extractsRepository: InMemoryExtractsRepository;
let sut: ExtractsByDataUseCase;

describe("testando useCase de estrato", ()=>{

    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository;
        extractsRepository = new InMemoryExtractsRepository;
        sut = new ExtractsByDataUseCase(extractsRepository);
        vi.useFakeTimers();
    })

    afterEach(()=>{
       vi.useRealTimers(); 
    })

    it("usuario de conseguir acessar seu extrato de um tempo x a y", async()=>{
        

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

        vi.setSystemTime(new Date(2023, 5, 1, 15, 1));

        await extractsRepository.createExtracts({
            id_user: 1,
            name: "Usuario Test",
            tipo: "deposito",
            saldo: 50,
            data: date(),
            descricao: "",
        })

        vi.setSystemTime(new Date("02-02-2023"));

        for (let index = 0; index < 5; index++) {
            await extractsRepository.createExtracts({
                id_user: 1,
                name: "Usuario Test",
                tipo: "deposito",
                saldo: 50,
                data: date(),
                descricao: "",
            })
            
        }
  
        const id_user = 1, dateStart = "02-02-2023", dateEnd = "02-04-2023";

        const extratos = await sut.execute(id_user, dateStart, dateEnd);
        expect(extratos).toEqual(expect.any(Array))
        expect(extratos).toHaveLength(5);
    })
})