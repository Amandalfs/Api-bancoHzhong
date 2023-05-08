const AppError = require("../../utils/AppError");

class ShowUserService {
    UserRepository;
    ExtractRepository;
    constructor(UserRepository, ExtractRepository){
        this.UserRepository = UserRepository;
        this.ExtractRepository = ExtractRepository;
    } 

    async execute(id_user){

        const user = await this.UserRepository.findUserById(id_user);

        if(!user){
            throw new AppError("Usuario nao encontrado");
        }

        const extracts = await this.ExtractRepository.SearchForMoreRecentExtractsById(id_user);
        const joinData = {
            user,
            extracts
        }

        return joinData;

    }
}

module.exports = ShowUserService;