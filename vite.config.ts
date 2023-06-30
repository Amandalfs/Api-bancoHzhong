import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environmentMatchGlobs:[["src/main/controllers/**", "knex"]],	
	}
});