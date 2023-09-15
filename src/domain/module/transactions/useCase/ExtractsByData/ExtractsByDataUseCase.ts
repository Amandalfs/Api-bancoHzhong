import { IExtracsRepository, IReponseExtracs } from "./protocols";

export class DTORequestExtractsByDateUseCase {
	public id_user: number;
	public dateStart: Date;
	public dateEnd: Date;
	public page: number;
	public rows: number;
	constructor(id: number, start: Date, end: Date, page: number, rows: number){
		this.id_user = id;
		this.dateStart = start;
		this.dateEnd = end;
		this.page = page;
		this.rows = rows;
	}
}

export class DTOResponseExtractsByDateUseCase {
	public extracts: IReponseExtracs[];
	public details: {
        page: number
        pagesTotal: number
        totalDocs: number
    };
	constructor(props: DTOResponseExtractsByDateUseCase){
		this.extracts = props.extracts;
		this.details = props.details;
	}
}

export interface IExtractsByDateUseCase {
    execute(data: DTORequestExtractsByDateUseCase): Promise<DTOResponseExtractsByDateUseCase>
}

class ExtractsByDataUseCase implements IExtractsByDateUseCase{
	constructor(private ExtractsRepository: IExtracsRepository){} 

	async execute({id_user, dateStart, dateEnd, page, rows}: DTORequestExtractsByDateUseCase){
		const extracts = await this.ExtractsRepository.SearchForDataStartAndEndbyId({id:id_user, dateStart, dateEnd, page, rows});

		const totalDocs = await this.ExtractsRepository.getCountDocs({userId: id_user, startDate: dateStart, endDate: dateEnd});
		const pagesTotal = totalDocs/rows;

		return new DTOResponseExtractsByDateUseCase({
			extracts,
			details: {
				page,
				pagesTotal: pagesTotal < 1 ? 1: Math.ceil(pagesTotal),
				totalDocs,
			}
		});
	}
}

export { ExtractsByDataUseCase };