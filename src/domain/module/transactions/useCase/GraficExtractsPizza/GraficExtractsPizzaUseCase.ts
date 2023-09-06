import { IExtracsRepository } from "../DepositTransactions/protocols";

interface InputGraficExtractsPizzaDTO {
    id: number,
    startDate: Date,
    endDate: Date,
}

interface OutputGraficExtractsPizzaDTO {
    incomes: number,
    expenses: number,
}

interface IGraficExtractsPizzaUseCase {
    execute(input: InputGraficExtractsPizzaDTO): Promise<OutputGraficExtractsPizzaDTO>
}

export class GraficExtractsPizza implements IGraficExtractsPizzaUseCase {
    
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