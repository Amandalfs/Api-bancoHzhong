

class SessionsUsersController{
    sessionsUsersUseCase
    constructor(SessionsUsersUseCase){
        this.sessionsUsersUseCase = SessionsUsersUseCase;
    }

    async handle(req, res){
        const { username } = req.body;
        const { password } = req.headers;
        
        const token = await this.sessionsUsersUseCase.execute(username, password);

        return  res.status(202).send({token});
    }
}

module.exports = SessionsUsersController;