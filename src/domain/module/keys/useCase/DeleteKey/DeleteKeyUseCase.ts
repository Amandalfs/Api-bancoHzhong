import { IUserRepository } from "./protocols";
import { KeyDoesNotExistError, ResourceNotFoundError } from "./errors";

export class DTORequestDeleteKeyUseCase {
	public id: number;
	constructor(id:number){
		this.id = id;
	}
}

export class DTOResponseDeleteKeyUseCase {
	public msg: string;
	constructor(msg: string){
		this.msg = msg;
	}
}

export interface IDeleteKeyUseCase{
    execute(data: DTORequestDeleteKeyUseCase): Promise<DTOResponseDeleteKeyUseCase>
}

class DeleteKeyUseCase implements IDeleteKeyUseCase{

	constructor(private UserRepository: IUserRepository){
	}

	async execute({id}: DTORequestDeleteKeyUseCase){
		const user = await this.UserRepository.findUserById(id);

		if(!user){
			throw new ResourceNotFoundError();
		}

		if(!user.keypix){
			throw new KeyDoesNotExistError();
		}

		await this.UserRepository.deleteKeyPixById(id);

		return new DTOResponseDeleteKeyUseCase("key delete success");
	}
}

export { DeleteKeyUseCase };