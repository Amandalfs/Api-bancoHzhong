const garantirAuth = require('../middlewares/garantirAuth');

const generatorDate = require('../utils/dateGenerator');
const date = require('../utils/date');

const dbUsers = require('../sql/dbUsers');
const dbExtratos = require('../sql/dbExtratos');

const NotAutheticPassword = async (req, res, next) =>{
    const { compare } = require('bcrypt')
    
    const { id } = req.user;
    const { password } = req.headers;

    const user = await dbUsers.getUserById({id: id});
    
    const passwordPassed = await compare(password, user.password);

    if(!passwordPassed){
        return res.status(401).send("Senha digitada esta errada")
    }

    next();
}



const withdrawUser = (app) => {
    app.route('/users/withdraw')
        .patch(garantirAuth, NotAutheticPassword, async(req, res) => {

            const { valueWithdraw } = req.body;
            const { id } = req.user
            const user = await dbUsers.getUserById({id: id});

            if(valueWithdraw<0){
                return res.status(401).send({Error: "Saldo invalido"});
            }

            if(valueWithdraw>user.saldo){
                return res.status(401).send({Error: "Saldo insuficiente"});
            }
            
            const tipo = "Saque";
            const data = date();


            const saldoNovo = user.saldo - valueWithdraw;

            const desc = `Voce sacou R$${valueWithdraw.toFixed(2).replace('.',',')}`

            const extratoNew = {
                id_user: id,
                name: user.name,
                tipo: tipo,
                saldo: saldoNovo,
                data: data,
                descricao: desc,
            }

            await dbExtratos.createExtrato(extratoNew)
            await dbUsers.updateUser({id: id}, {saldo: saldoNovo})

            return res.status(202).send({"Saque efetuado com sucesso":valueWithdraw});

        })
}

module.exports = withdrawUser;
