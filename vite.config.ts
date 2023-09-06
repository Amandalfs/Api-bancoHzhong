const { defineConfig } = require("vitest/config");

export default defineConfig({
	test: {
		environmentMatchGlobs:[["src/**", ""]],	
		exclude:['node_modules', 'dist', '.idea', '.git', '.cache', 'src/main/**']
	}
});