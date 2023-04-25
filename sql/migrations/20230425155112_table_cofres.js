/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('cofres', function (table) {
        table.increments('id_cofre').primary();
        table.integer('id_user');
        table.string('name');
        table.string('name_cofre')
        table.string('saldo');
        table.string('meta');
        table.boolean("isMeta");
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropSchema('cofres');
};
