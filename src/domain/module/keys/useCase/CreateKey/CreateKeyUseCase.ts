import { IKeyGenerator, IUserRepository } from "./protocols";
import { KeyAlreadyExistsError, ResourceNotFoundError } from "./errors";

export class DTORequestCreatekeyUseCase {
	public id:number;
	constructor(id:number){
		this.id = id;
	}
}

export class DTOResponseCreatekeyUseCase {
	key: string;
	constructor(key: string){
		this.key = key;
	}
}

export interface ICreatekeyUseCase {
    execute(data:DTORequestCreatekeyUseCase): Promise<DTOResponseCreatekeyUseCase>
}


class CreateKeyUseCase implements ICreatekeyUseCase{

	constructor(private UserRepository: IUserRepository, private keyGenerator: IKeyGenerator){}

	async execute({id}: DTORequestCreatekeyUseCase){
		const user = await this.UserRepository.findUserById(id);

		if(!user){
			throw new ResourceNotFoundError();
		}

		if(user.keypix){
			throw new KeyAlreadyExistsError();
		}

		const key = this.keyGenerator.execute();
		await this.UserRepository.createKeyPixById(id, key);

		return new DTOResponseCreatekeyUseCase(key);
	}
}

export { CreateKeyUseCase };