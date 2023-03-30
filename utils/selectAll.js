const pool = require('../sql/sqlconfig');

async function selectAll(){
    const dados = await pool.query('SELECT * FROM "dadosbanco"');
    return dados.rows;
}

module.exports = selectAll;
