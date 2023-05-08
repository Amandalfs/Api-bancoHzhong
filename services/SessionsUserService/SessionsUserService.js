const { compare } = require("bcrypt");
const authConfig = require('../../config/auth');
const { sign } = require('jsonwebtoken');
const AppError = require('../../utils/AppError');


class SessionsUserService{
    UserRepository
    constructor(UserRepository){
        this.UserRepository = UserRepository;
    }
    
    async execute(username, password){
        

        const user = await this.UserRepository.findUserByUsername(username);

        if(!user){
            throw new AppError("Senha Ou Username digitada esta errada", 401);
        }

        const passwordPassed = await compare(password, user.password);
        
        if(!passwordPassed){
            throw new AppError("Senha Ou Username digitada esta errada", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return token;
    }
}

module.exports = SessionsUserService;