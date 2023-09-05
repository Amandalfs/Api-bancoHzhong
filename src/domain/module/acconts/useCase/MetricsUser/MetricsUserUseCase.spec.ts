import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IUserRepository } from "../SessionsUsers/protocols";
import { IExtracsRepository } from "../ShowUser/protocols";
import { InMemoryUsersRepository } from "../../../../../entities/repositories/inMemory/InMemoryUsersRepository";
import { InMemoryExtractsRepository } from "../../../../../entities/repositories/inMemory/InMemoryExtractsRepository";
import { IMetricsUserUseCase, MetricsUserUseCase } from "./MetricsUserUseCase";

interface TypeSuit {
    usersRepository: IUserRepository,
    extractsRepository: IExtracsRepository,
    suit: IMetricsUserUseCase
}

const makeSuit = (): TypeSuit => {
    const usersRepository = new InMemoryUsersRepository();
    const extractsRepository = new InMemoryExtractsRepository();
    const useCase = new MetricsUserUseCase(usersRepository, extractsRepository);
    return {
        usersRepository,
        extractsRepository,
        suit: useCase
    }
};

describe("metrics user usecase tests units", ()=>{
    beforeEach(()=>{
        vi.useFakeTimers();
    })

    afterEach(()=>{
       vi.useRealTimers(); 
    })

    it("should achieve the input and output metric for money.", async ()=>{
        const { suit, usersRepository, extractsRepository } = makeSuit(); 
        vi.setSystemTime(new Date(2023, 5, 9, 15, 1));

        usersRepository.createUser({
            "username": "Usuario Test",
            "name": "Usuario Test",
            "nasc": "02-10-2003",
            "typeaccont": "poupanca",
            "email": "usuario57@test.com",
            "password": "123456789",
            "cpf": "12603863096",
            agencia: "001",
            numero: 123,
            saldo: 500,
            keypix: "jhbvjouabdfovisdfb",
        });

        extractsRepository.createExtracts({
            data: new Date(),
            descricao: "description",
            id_user: 1,
            name: "Extract",
            saldo: 10,
            tipo: "Saque"
        })

        extractsRepository.createExtracts({
            data: new Date(),
            descricao: "description",
            id_user: 1,
            name: "Extract",
            saldo: 500,
            tipo: "deposito"
        })

        const id = 1;
        const { monthlyIncome, monthlyExpenses } = await suit.execute({id});
        expect(monthlyExpenses).toEqual(10);
        expect(monthlyIncome).toEqual(500);
    })
})