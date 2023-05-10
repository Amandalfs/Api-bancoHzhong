const db = require('../sql/knex')

class ExtractsRepository {
    async SearchForMoreRecentExtractsById(id_user){
        const extracts = await db('extratos').select("tipo", "saldo", "data", "descricao").where("id_user",id_user).orderBy('data', 'desc').limit(5);
        return extracts;
    }

    async createExtracts(data){
        await  db('extratos').insert(data);
    }

    async SearchForDataStartAndEndbyId(id, dateStart, dateEnd){
        return await db('extratos').where("id_user",id).where('data', '>=', dateStart).where('data', '<=', dateEnd);
    }
}

module.exports = ExtractsRepository;