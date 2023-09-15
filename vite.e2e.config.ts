import { defineConfig } from "vitest/config";

module.exports = defineConfig({
	test: {
		include: ["./src/**/*e2e.spec.ts"],
		environmentMatchGlobs:[["src/**", "knex"]],
		exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
		testTimeout: 10000,
	}
});