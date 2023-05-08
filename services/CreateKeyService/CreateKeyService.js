const keyGenerator = require("../../utils/keyGenerator");
const AppError = require('../../utils/AppError');

module.exports = class CreateKeyService{
    userRepository
    constructor(UserRepository){
        this.userRepository = UserRepository;
    }

    async execute(id){
        const user = await this.userRepository.findUserById(id);

        if(user.keypix){
            throw new AppError("Chave pix Ja existe")
        }

        const ChaveGerada =  await keyGenerator();
        await this.userRepository.createKeyPixById(id, ChaveGerada)

        return ChaveGerada;
    }
}