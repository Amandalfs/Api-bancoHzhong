const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
	test: {
		include: ['./src/**/*e2e.spec.ts'],
		environmentMatchGlobs:[["src/**", "knex"]],
		tags: ["e2e"],
		exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        testTimeout: 10000,

    }
});