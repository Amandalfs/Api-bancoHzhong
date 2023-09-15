import { IExtracsRepository as IExtractsRepository } from "../../../../../entities/repositories/implementations/IExtractsRepository";

export class InputGraficDayStatsUseCaseDTO {
	public startDate: Date;
	public endDate: Date;
	public id: number;

	constructor(props: InputGraficDayStatsUseCaseDTO){
		Object.assign(this, props);
	}
}

interface Item {
    date: Date,
    value: number
}

export class OutputGraficDayStatsUseCaseDTO {
	public revenues: Item[];
	public expenses: Item[];

    
	constructor(props: OutputGraficDayStatsUseCaseDTO){
		Object.assign(this, props);
	}
}

export interface IGraficDayStatsUseCase {
    execute(input: InputGraficDayStatsUseCaseDTO): Promise<OutputGraficDayStatsUseCaseDTO>
}

export class GraficDayStatsUseCase implements IGraficDayStatsUseCase {
    
	constructor(private extractsRepository: IExtractsRepository){}

	async execute({ startDate, endDate, id }: InputGraficDayStatsUseCaseDTO): Promise<OutputGraficDayStatsUseCaseDTO> {
		const revenues = await this.extractsRepository.revenuesExtractsByDays({
			startDate,
			endDate,
			userId: id,
		});

		const expenses = await this.extractsRepository.expensesExtractsByDays({
			startDate,
			endDate,
			userId: id,
		});

		const output = new OutputGraficDayStatsUseCaseDTO({
			revenues,
			expenses,
		});
        
		return output;
	}
}