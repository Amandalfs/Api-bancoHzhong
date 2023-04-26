/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('extrato', function (table) {
        table.increments('id').primary();
        table.integer('id_user').references('id').table('users');
        table.string('name');
        table.string('tipo');
        table.string('saldo');
        table.date('data');
        table.string("descricao");
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable('extrato');
};
