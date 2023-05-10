const AppError = require("../../../../utils/AppError");

class ShowUserUseCase {
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
        const userSend = {
            name: user.name,
            username: user.username,
            saldo: user.saldo,
            typeaccont: user.typeaccont,
            keypix: user.keypix

        }
        const extracts = await this.ExtractRepository.SearchForMoreRecentExtractsById(id_user);
        const joinData = {
            userSend,
            extracts
        }

        return joinData;

    }
}

module.exports = ShowUserUseCase;