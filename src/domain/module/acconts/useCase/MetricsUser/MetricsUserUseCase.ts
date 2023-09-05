import { subMonths } from 'date-fns';
import { IUserRepository } from "../SessionsUsers/protocols"
import { IExtracsRepository } from "../ShowUser/protocols"
import { ResourceNotFoundError } from "../ShowUser/errors"

export interface InputMetricsUserUseCaseDTO {
    id: number
}

export interface OutputMetricsUserUseCaseDTO {
    monthlyIncome: number, 
    monthlyExpenses: number
}

export interface IMetricsUserUseCase {
    execute(input: InputMetricsUserUseCaseDTO): Promise<OutputMetricsUserUseCaseDTO>
}

export class MetricsUserUseCase implements IMetricsUserUseCase {
    
    constructor(private usersRepository: IUserRepository, private extractsRepository: IExtracsRepository){}
    
    async execute({ id }: InputMetricsUserUseCaseDTO): Promise<OutputMetricsUserUseCaseDTO> {
        const user = await this.usersRepository.findUserById(id);

        if(!user){
            throw new ResourceNotFoundError();
        }
        
        const today = new Date();
        const lastMonth = subMonths(today, 1);

        const monthlyIncome = await this.extractsRepository.findIncomesByDate({id, today, lastMonth});
        const monthlyExpenses = await this.extractsRepository.findExpensesByDate({id, today, lastMonth});

        return {
            monthlyExpenses,
            monthlyIncome,
        }
    }

}



