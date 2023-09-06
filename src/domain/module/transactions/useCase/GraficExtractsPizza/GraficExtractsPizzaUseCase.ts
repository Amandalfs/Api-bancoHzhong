import { IExtracsRepository } from "../DepositTransactions/protocols";

export interface InputGraficExtractsPizzaDTO {
    id: number,
    startDate: Date,
    endDate: Date,
}

export interface OutputGraficExtractsPizzaDTO {
    incomes: number,
    expenses: number,
}

export interface IGraficExtractsPizzaUseCase {
    execute(input: InputGraficExtractsPizzaDTO): Promise<OutputGraficExtractsPizzaDTO>
}

export class GraficExtractsPizzaUseCase implements IGraficExtractsPizzaUseCase {
    
    constructor(private extractsRepository: IExtracsRepository){}
    
    async execute({ id, startDate, endDate }: InputGraficExtractsPizzaDTO): Promise<OutputGraficExtractsPizzaDTO> {
        const incomes = await this.extractsRepository.findIncomesByDate({
            id,
            lastMonth: startDate,
            today: endDate
        }) 

        const expenses = await this.extractsRepository.findExpensesByDate({
            id,
            lastMonth: startDate,
            today: endDate,
        })

        return {
            expenses: expenses ?? 0,
            incomes: incomes ?? 0,
        }
    }

}