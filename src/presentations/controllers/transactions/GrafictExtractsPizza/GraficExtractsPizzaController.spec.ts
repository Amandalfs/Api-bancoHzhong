import { describe, expect, it, vi } from "vitest";
import { IGraficExtractsPizzaUseCase, InputGraficExtractsPizzaDTO, OutputGraficExtractsPizzaDTO } from "../../../../domain/module/transactions/useCase/GraficExtractsPizza/GraficExtractsPizzaUseCase";
import { HttpRequest } from "../DepositTransactions/DepositTransactionsControllerProtocols";
import { GraficExtractsPizzaController } from "./GraficExtractsPizzaController";

interface TypeSuit {
    useCase: IGraficExtractsPizzaUseCase,
    suit: GraficExtractsPizzaController,
}

const makeSuit = (): TypeSuit =>{
    const useCase = new class GraficExtractsPizzaMock implements IGraficExtractsPizzaUseCase {
        async execute(input: InputGraficExtractsPizzaDTO): Promise<OutputGraficExtractsPizzaDTO> {
            return new Promise(resolve => resolve({
                expenses: 50,
                incomes: 70,
            }))
        }
    }

    const suit = new GraficExtractsPizzaController(useCase);

    return {
        suit,
        useCase
    }
};

describe("grafic extracs pizza controller tests units", ()=>{

    it("should throw a 500 server error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 1
            },
            query: {
                startDate: new Date(),
                endDate: new Date(),
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(500);
        expect(response.body.msg).toEqual("Server Internal Error");
    });

    it("should throw a 400 bad request error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 400, message: "Bad Request"});
        const request: HttpRequest = {
            user: {
                id: 1
            },
            query: {
                startDate: new Date(),
                endDate: new Date(),
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    });

})