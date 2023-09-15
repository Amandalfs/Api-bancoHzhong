import { config } from "dotenv";
import { knex } from "knex";
import knexfile from "../../../knexfile";
config();


const environment =  process.env.NODE_ENV || "development";
const ConfigDb = knexfile[environment];

export const db = knex(ConfigDb);