import { describe, expect, vi, it } from "vitest";
import { IMetricsUserUseCase, InputMetricsUserUseCaseDTO, OutputMetricsUserUseCaseDTO } from "../../../../domain/module/acconts/useCase/MetricsUser/MetricsUserUseCase";
import { HttpRequest } from "../CreateUser/CreateUserControllerProtocols";
import { MetricsUserController } from "./MetricsUserController";

interface TypeSuit {
    useCase: IMetricsUserUseCase
    suit: MetricsUserController
};

const makeSuit = (): TypeSuit => {
    const useCase = new class UseCase implements IMetricsUserUseCase{
        async execute({}: InputMetricsUserUseCaseDTO): Promise<OutputMetricsUserUseCaseDTO> {
            return new Promise(resolve => resolve({
                monthlyExpenses: 10,
                monthlyIncome: 500,
            }))
        }
    }
    const suit = new MetricsUserController(useCase);
    
    return {
        suit, 
        useCase
    }
};

describe("metrics user controller tests units", ()=>{

    it("should throw a 500 server error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue(new Error);
        const request: HttpRequest = {
            user: {
                id: 1
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
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(400);
        expect(response.body.msg).toEqual("Bad Request");
    });

    it("should throw a 401 Unauthorized error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 401, message: "Unauthorized"});
        const request: HttpRequest = {
            user: {
                id: 1
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(401);
        expect(response.body.msg).toEqual("Unauthorized");
    });

    it("should throw a 403 Forbidden error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 403, message: "Forbidden"});
        const request: HttpRequest = {
            user: {
                id: 1
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(403);
        expect(response.body.msg).toEqual("Forbidden");
    });

    it("should throw a 404 Not Found error status", async()=>{
        const { suit, useCase } = makeSuit();

        vi.spyOn(useCase, "execute").mockRejectedValue({statusCode: 404, message: "Not Found"});
        const request: HttpRequest = {
            user: {
                id: 1
            }
        }
        const response = await suit.handle(request);
        expect(response.statusCode).toEqual(404);
        expect(response.body.msg).toEqual("Not Found");
    });

    it("should be able to send the data correctly to the use case", async ()=>{
        const { suit, useCase } = makeSuit();
        const useCaseSpy = vi.spyOn(useCase, "execute");
        const request: HttpRequest = {
            user: {
                id: 1
            }
        }
        await suit.handle(request);
        expect(useCaseSpy.mock.calls[0][0].id).toEqual(1);
    })
});