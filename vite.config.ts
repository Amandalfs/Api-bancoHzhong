import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environmentMatchGlobs:[["src/main/controllers/*.e2e.spec.ts", "knex"]],	
	}
});