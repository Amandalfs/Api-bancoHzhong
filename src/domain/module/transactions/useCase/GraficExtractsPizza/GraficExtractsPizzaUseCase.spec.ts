
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryExtractsRepository } from '../../../../../entities/repositories/inMemory/InMemoryExtractsRepository';
import { IExtracsRepository } from '../DepositTransactions/protocols';
import { GraficExtractsPizza } from './GraficExtractsPizzaUseCase';

interface TypeSuit {
    extractsRepository: IExtracsRepository,
    suit: GraficExtractsPizza,
}

const makeSuit = (): TypeSuit => {
    const extractsRepository = new InMemoryExtractsRepository();
    const useCase = new GraficExtractsPizza(extractsRepository);
    
    return {
        extractsRepository,
        suit: useCase
    }
}
describe("grafic extracts pizza use case tests units", ()=>{
    
    beforeEach(()=>{
        vi.useFakeTimers();
    })

    afterEach(()=>{
       vi.useRealTimers(); 
    })

    it("should be able to access the data of the chart for that interval.", async()=>{
        vi.setSystemTime(new Date(2023, 5, 9, 15, 1));
        const  { suit, extractsRepository } = makeSuit();
        extractsRepository.createExtracts({
            data: new Date(2023, 4, 15, 15, 1),
            descricao: "teste",
            id_user: 1,
            name: "teste",
            saldo: 150,
            tipo: "deposito"
        })

        extractsRepository.createExtracts({
            data: new Date(2023, 4, 17, 15, 1),
            descricao: "teste",
            id_user: 1,
            name: "teste",
            saldo: 150,
            tipo: "deposito"
        })

        extractsRepository.createExtracts({
            data: new Date(2023, 4, 17, 15, 1),
            descricao: "teste",
            id_user: 1,
            name: "teste",
            saldo: 150,
            tipo: "Saque"
        })

        const input = {
            id: 1,
            startDate: new Date(2023, 4, 14, 15, 1),
            endDate: new Date(2023, 5, 9, 15, 1)
        }

        const response = await suit.execute(input);
        expect(response.incomes).toEqual(300);
        expect(response.expenses).toEqual(150);
    })

    it("should return zero if no data is found.", async ()=>{
        const { suit } = makeSuit();
        const input = {
            id: 1,
            startDate: new Date(),
            endDate: new Date(),
        }
        const response = await suit.execute(input);
        expect(response.expenses).toEqual(0);
        expect(response.incomes).toEqual(0);
    })
});