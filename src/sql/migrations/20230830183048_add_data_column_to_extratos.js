import { Knex } from "knex";

export async function up(knex) {
    return knex.schema.alterTable('extratos', function(table) {
        table.timestamp('data').defaultTo(knex.fn.now()).alter();
    });
}


export async function down(knex){
    return knex.schema.alterTable('extratos', function(table) {
        table.dropColumn('data').alter();
    });
}

