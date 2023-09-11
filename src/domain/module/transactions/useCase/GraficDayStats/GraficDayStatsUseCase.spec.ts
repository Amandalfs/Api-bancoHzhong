
import { describe, expect, it, vi } from 'vitest';
import { IExtracsRepository, IReponseExtracs, IRequestCountBySending, IRequestCountByWithdraw, IRequestSearchForDataStartAndEndbyId } from './../../../../../entities/repositories/implementations/IExtractsRepository';
import { IExtracts } from '../../../../../entities/repositories/model/IExtracts';
import { GraficDayStatsUseCase, IGraficDayStatsUseCase } from './GraficDayStatsUseCase';

interface TypeSuit {
    suit: IGraficDayStatsUseCase,
    repository: IExtracsRepository,
}

const makeSuit = (): TypeSuit => {
    const repository = new class mockRepository implements IExtracsRepository {
        SearchForMoreRecentExtractsById(id_user: number): Promise<IReponseExtracs[]> {
            throw new Error('Method not implemented.');
        }
        createExtracts(data: IExtracts): Promise<void> {
            throw new Error('Method not implemented.');
        }
        SearchForDataStartAndEndbyId({ id, dateStart, dateEnd }: IRequestSearchForDataStartAndEndbyId): Promise<IReponseExtracs[]> {
            throw new Error('Method not implemented.');
        }
        CountByWithdraw(data: IRequestCountByWithdraw): Promise<number> {
            throw new Error('Method not implemented.');
        }
        CountBySending(data: IRequestCountBySending): Promise<number> {
            throw new Error('Method not implemented.');
        }
        findIncomesByDate(data: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
            throw new Error('Method not implemented.');
        }
        findExpensesByDate(data: { id: number; today: Date; lastMonth: Date; }): Promise<number> {
            throw new Error('Method not implemented.');
        }

        async revenuesExtractsByDays(data: { startDate: Date; endDate: Date; }): Promise<{ date: Date; value: number; }[]> {
            return new Promise(resolve => resolve([
                {
                    date: new Date(),
                    value: 10
                },
                {
                    date: new Date(),
                    value: 10
                },
            ]))
        }
        async expensesExtractsByDays(data: { startDate: Date; endDate: Date; }): Promise<{ date: Date; value: number; }[]> {
            return new Promise(resolve => resolve([
                {
                    date: new Date(),
                    value: 10
                },
                {
                    date: new Date(),
                    value: 10
                },
                {
                    date: new Date(),
                    value: 10
                },
                {
                    date: new Date(),
                    value: 10
                },
                {
                    date: new Date(),
                    value: 10
                },
            ]))
        }
    }
    const suit = new GraficDayStatsUseCase(repository);

    return {
        repository,
        suit,
    }
};

describe("grafic day stats tests units", async ()=>{
    const { suit } = makeSuit();

    it("should receive two arrays from the use case with input and output data.", async () => {
        const { revenues, expenses } = await suit.execute({
            startDate: new Date(2023, 1, 1, 1),
            endDate: new Date(2023, 2, 1, 1)
        });
    
        expect(revenues).toHaveLength(2);
        expect(expenses).toHaveLength(5);
    })

    it("should not handle repository errors.", async ()=>{
        const { suit, repository } = makeSuit();
        vi.spyOn(repository, "revenuesExtractsByDays").mockRejectedValue({message: "error"});
        await expect(
            suit.execute({
                startDate: new Date(2023, 1, 1, 1),
                endDate: new Date(2023, 2, 1, 1)
            })
        ).rejects.toEqual({message: "error"});
    })
    
})