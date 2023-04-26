/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('cofres', function (table) {
        table.increments('id').primary();
        table.integer('id_user').references('id').inTable('users');
        table.string('name');
        table.string('name_cofre')
        table.string('saldo');
        table.string('meta');
        table.boolean("isMeta");
      }).then(function () {
        console.log('Tabela "cofres" criada com sucesso!');
      }).catch(function (error) {
        console.error('Erro ao criar tabela "cofres": ', error);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropSchema('cofres');
};
