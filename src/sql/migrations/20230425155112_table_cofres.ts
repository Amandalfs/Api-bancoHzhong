import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTableIfNotExists('cofres', function (table) {
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


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropSchema('cofres');
};
