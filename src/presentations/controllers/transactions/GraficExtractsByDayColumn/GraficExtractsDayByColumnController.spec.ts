import { describe, expect, it, vi } from "vitest";
import { HttpRequest } from "../../../protocols/http";
import { IGraficDayStatsUseCase, InputGraficDayStatsUseCaseDTO, OutputGraficDayStatsUseCaseDTO } from "../../../../domain/module/transactions/useCase/GraficDayStats/GraficDayStatsUseCase";
import { GraficExtractsDayByColumnController } from "./GraficExtractsDayByColumnController";

interface TypeSuit {
    useCase: IGraficDayStatsUseCase,
    suit: GraficExtractsDayByColumnController,
}

const makeSuit = (): TypeSuit  => { 
    const useCase = new class UseCase implements IGraficDayStatsUseCase {
        async execute(input: InputGraficDayStatsUseCaseDTO): Promise<OutputGraficDayStatsUseCaseDTO> {
            return new Promise(resolve => resolve(new OutputGraficDayStatsUseCaseDTO({
                expenses: [
                    {
                        date: new Date(),
                        value: 300,
                    }
                ],
                revenues: [
                    {
                        date: new Date(),
                        value: 300
                    }
                ]
            })))
        }
    }

    const suit = new GraficExtractsDayByColumnController(useCase);

    return {
        useCase,
        suit,
    }
}

describe("grafic extracts day by column controller tests units", async () => {

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

})