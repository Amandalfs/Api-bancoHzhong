import "dotenv/config";
import { Environment } from "vitest";
import { db }  from "../src/sql/knex";

import { randomUUID } from "crypto";
import { execSync } from "child_process";

function generateDataBaseUrl(schema: string){
	if(!process.env.DATABASE_URL){
		throw new Error("Please provide a DATABASE_URL environment variable.");
	}

	const url = new URL(process.env.DATABASE_URL);
	url.searchParams.set("schema", schema);

	return url.toString() ;
}


export default <Environment>{
	name: "knex",
	async setup(){
		const schema = `schema${randomUUID()}`;
		const dataBaseURL = generateDataBaseUrl(schema);
		
		process.env.DATABASE_URL = dataBaseURL;
		try {
			await db.schema.createSchema(`${schema}`);
			const command = "npm run knex migrate:latest -- --env test";
			execSync(command);
		} catch (error) {
			console.log(error);
		}

		return {
			async teardown() {
				await db.schema.dropSchemaIfExists(schema, true);
				await db.destroy();
			},
		};
	},
};

