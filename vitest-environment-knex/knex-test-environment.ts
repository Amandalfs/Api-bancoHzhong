import "dotenv/config";
import { Environment } from "vitest";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import {db}  from "../src/sql/knex";

function generateDataBaseUrl(schema: string){
	if(!process.env.DATABASE_URL){
		throw new Error("Please provide a DATABASE_URL environment variable.");
	}

	const url = new URL(process.env.DATABASE_URL);
	url.searchParams.set("schema", schema);

	return url.toString();
}


export default <Environment>{
	name: "knex",
	async setup(){
		const schema = randomUUID();
		const dataBaseURL = generateDataBaseUrl(schema);

		process.env.DATABASE_URL = dataBaseURL;

		execSync("npm run knex migrate:latest");

		return {
			async teardown() {
                await db.raw(`DROP SCHEMA IF EXISTS "?" CASCADE`, [schema]);
			},
		};
	},
};

