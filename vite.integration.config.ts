const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
	test: {
		include: ['./src/**/*integration.ts'],
		environmentMatchGlobs:[["src/**", "knex"]],
		tags: ["integration"],
		exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        testTimeout: 10000,
    }
});