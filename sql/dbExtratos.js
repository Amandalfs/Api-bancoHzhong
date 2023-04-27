const db = require('./knex/index');

module.exports = {
    getAllExtratos(id, dataInicial, dataFinal) {
        return db('extratos')
            .where(id)
            .where('data', '>=', dataInicial)
            .where('data', '<=', dataFinal)
    },

    
    getExtratoById(id) {
        return db('extratos').where(id).first()
    },

    createExtrato(dados) {
        return db('extratos').insert(dados)
    },

    updateExtrato(id, dados) {
        return db('extratos').where(id).update(dados)
    },

    deleteExtrato(id) {
        return db('extratos').where(id).del()
    },

}

