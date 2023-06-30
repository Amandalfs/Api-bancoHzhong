import "dotenv/config";
import { Environment } from "vitest";
import { db }  from "../src/sql/knex";

export default <Environment>{
	name: "knex",
	async setup(){
		return {
			async teardown() {
                await db('users').delete();
				await db('extratos').delete();
				await db('cofres').delete();
			},
		};
	},
};

