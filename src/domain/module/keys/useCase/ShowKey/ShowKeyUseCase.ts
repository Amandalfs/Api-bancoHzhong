import { IUserRepository } from "./protocols";

import { KeyDoesNotExistError, ResourceNotFoundError } from "./errors";

export class DTORequestShowKeyUseCase{
	public id: number;
	constructor(id){
		this.id = id;
	}
}

export class DTOResponseShowKeyUseCase{
	public key: string;
	constructor(key){
		this.key = key;
	}
}

export interface IShowKeyUseCase{
    execute(data: DTORequestShowKeyUseCase): Promise<DTOResponseShowKeyUseCase>
}

class ShowKeyUseCase implements IShowKeyUseCase{
	constructor(private UserRepository: IUserRepository){}

	async execute({id}: DTORequestShowKeyUseCase){
		const user = await this.UserRepository.findUserById(id);

		if(!user){
			throw new ResourceNotFoundError();
		}

		if(!user.keypix){
			throw new KeyDoesNotExistError();
		}

		return new DTOResponseShowKeyUseCase(user.keypix);
	}
}

export { ShowKeyUseCase };