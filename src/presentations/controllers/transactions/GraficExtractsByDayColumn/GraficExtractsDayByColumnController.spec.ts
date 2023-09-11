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

    it("should throw a 400 bad request error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 400, message: "Bad Request"});
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

    it("should throw a 401 unauthorized error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 401, message: "Unauthorized"});
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
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    });

    it("should throw a 403 Forbidden error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 403, message: "Forbidden"});
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
        expect(response.statusCode).toEqual(403);
        expect(response.body.msg).toEqual("Forbidden");
    });

    it("should throw a 404 Not Found error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({ statusCode: 404, message: "Not Found"});
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
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    });

    it("should send the data correctly to the use case.", async ()=>{
        const { suit, useCase } = makeSuit();
        const useCaseSpy = vi.spyOn(useCase, "execute");
        
        const request: HttpRequest = {
            user: {
                id: 1
            },
            query: {
                startDate: new Date(),
                endDate: new Date(),
            }
        }
        
        await suit.handle(request);
        expect(useCaseSpy.mock.calls[0][0]).toEqual({
            id: request.user.id,
            startDate: request.query.startDate,
            endDate: request.query.endDate,
        });
    })
})