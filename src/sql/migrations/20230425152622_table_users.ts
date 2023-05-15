import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('username');
        table.string('password');
        table.date('nasc');
        table.string('typeaccont');
        table.float('saldo');
        table.integer('numero');
        table.string('agencia');
        table.string('email');
        table.string('cpf');
        table.string('keypix')
      }).then(function () {
        console.log('Tabela "users" criada com sucesso!');
      }).catch(function (error) {
        console.error('Erro ao criar tabela "users": ', error);
      })
};


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
};
