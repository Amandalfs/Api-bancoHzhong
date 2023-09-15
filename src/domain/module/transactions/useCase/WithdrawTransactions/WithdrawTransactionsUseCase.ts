import { IExtracsRepository, IUserRepository} from "./protocols";

import {BalanceInsuficientError,InvalidValueError,LimitDayError,LimitError,ResourceNotFoundError} from "./errors";

export class DTORequestWithdrawTransctionsUseCase {
	public valueWithdraw: number;
	public id: number;
	constructor(valueWithdraw: number, id:number){
		this.valueWithdraw = valueWithdraw;
		this.id = id;
	}
}

interface ExtractNew {
    id_user: number,
    name: string,
    tipo: string,
    saldo: number,
    data: Date,
    descricao: string,
}

export class DTOResponseWithdrawTransctionsUseCase {
	public extratoNew: ExtractNew;
	constructor(extractNew: ExtractNew){
		this.extratoNew = extractNew;
	}
}

export interface IWithdrawTransctionsUseCase {
    execute(data: DTORequestWithdrawTransctionsUseCase): Promise<DTOResponseWithdrawTransctionsUseCase>    
}

class WithdrawTransactionsUseCase implements IWithdrawTransctionsUseCase{
	constructor(private UserRepository:IUserRepository, private ExtractsRepository:IExtracsRepository){}

	async execute({valueWithdraw, id}: DTORequestWithdrawTransctionsUseCase){

		const user = await this.UserRepository.findUserById(id);
            
		if(!user){
			throw new ResourceNotFoundError();
		}

		if(valueWithdraw<=0){
			throw new InvalidValueError();
		}

		if(valueWithdraw>user.saldo){
			throw new BalanceInsuficientError();
		}

		const Limits = [
			{
				type: "poupanca",
				value: 300
			},
			{
				type: "corrente",
				value: 800
			},
			{
				type: "universitaria",
				value: 450
			}
		];

		for (const limit of Limits) {
			if(limit.type===user.typeaccont && valueWithdraw>limit.value) {
				throw new LimitError(limit.value, limit.type);
			}                
		}
            
		const data = new Date();
		const type = "Saque";

		const dailyTotal = await this.ExtractsRepository.CountByWithdraw({dateStart: data, dateEnd: data, UserId:user.id});

		const limitsDay = [
			{
				type: "poupanca",
				value: 1500
			},
			{
				type: "corrente",
				value: 4000
			},
			{
				type: "universitaria",
				value: 2250
			}
		];

		for (const limitDay of limitsDay) {
			if(user.typeaccont === limitDay.type && dailyTotal+valueWithdraw > limitDay.value){
				throw new LimitDayError(limitDay.value, limitDay.type);
			}
		}

		const balanceNew = user.saldo - valueWithdraw;

		const desc = `Voce sacou R$${valueWithdraw.toFixed(2).replace(".",",")}`;

		const extractNew = {
			id_user: id,
			name: user.name,
			tipo: type,
			saldo: valueWithdraw,
			data: new Date(),
			descricao: desc,
		};

		await this.ExtractsRepository.createExtracts(extractNew);
		await this.UserRepository.updateBalanceById(id, balanceNew);

		return new DTOResponseWithdrawTransctionsUseCase(extractNew);

	}
}

export {WithdrawTransactionsUseCase};