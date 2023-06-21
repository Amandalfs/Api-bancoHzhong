import { IExtracsRepository, IReponseExtracs, IUserRepository} from "./protocols"
import { ResourceNotFoundError } from "./errors";

export class DTORequestShowUserUseCase {
    public id_user: number
    constructor(id_user){
        this.id_user = id_user;
    }
}

interface UserSend {
    name: string;
    username: string;
    saldo: number;
    typeaccont: string;
    keypix: string;
}

type Extracts = IReponseExtracs[]

export class DTOResponseShowUserUseCase {
    public userSend: {
        name: string;
        username: string;
        saldo: number;
        typeaccont: string;
        keypix: string;
    };
    public extracts: IReponseExtracs[];
    constructor(userSend: UserSend, extracts: Extracts){
        this.userSend = userSend;
        this.extracts = extracts
    }
}

export interface IShowUserUseCase {
    execute(data: DTORequestShowUserUseCase): Promise<DTOResponseShowUserUseCase>
}

class ShowUserUseCase implements IShowUserUseCase{

    constructor(private UserRepository: IUserRepository, private ExtractRepository:IExtracsRepository){} 

    async execute({id_user}: DTORequestShowUserUseCase){

        const user = await this.UserRepository.findUserById(id_user);
        
        if(!user){
            throw new ResourceNotFoundError();
        }
        const userSend = {
            name: user.name,
            username: user.username,
            saldo: user.saldo,
            typeaccont: user.typeaccont,
            keypix: user.keypix

        }
        const extracts = await this.ExtractRepository.SearchForMoreRecentExtractsById(id_user);
        return new DTOResponseShowUserUseCase(userSend, extracts);

    }
}

export { ShowUserUseCase }