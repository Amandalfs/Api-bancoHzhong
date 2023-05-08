const AppError = require('../../utils/AppError');

module.exports = class ShowKeyService{
    userRepository
    constructor(UserRepository){
        this.userRepository = UserRepository;
    }

    async execute(id){
        const user = await this.userRepository.findUserById(id);

        if(!user.keypix){
            throw new AppError("Chave pix nao existe");
        }

        return user.keypix;
    }
}