import { Knex } from "knex";

export async function up(knex) {
   return knex.schema.alterTable('extratos', function(table) {
        table.float('saldo').alter();
    })
}


export async function down(knex) {
    return knex.schema.alterTable('extratos', function(table) {
        table.dropColumn('saldo').alter();
    });
}


