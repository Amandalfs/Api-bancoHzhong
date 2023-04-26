/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('extratos', function (table) {
        table.increments('id').primary();
        table.integer('id_user').references('id').inTable('users');
        table.string('name');
        table.string('tipo');
        table.string('saldo');
        table.date('data');
        table.string("descricao");
      }).then(function () {
        console.log('Tabela "extratos" criada com sucesso!');
      }).catch(function (error) {
        console.error('Erro ao criar tabela "users": ', error);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable('extratos');
};
