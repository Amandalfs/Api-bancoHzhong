import { defineConfig, UserConfigExport } from "vitest/config";
interface KnexConfig {
	environment: string[][];
	exclude: string[];
	setTimeout: number;
}

interface ExtendedConfig extends UserConfigExport {
	knex: KnexConfig;
}
export default defineConfig<ExtendedConfig>({
	test: {
		environmentMatchGlobs:[["src/**", ""]],	
		exclude:['node_modules', 'dist', '.idea', '.git', '.cache', 'src/main/**']
	},
	knex: {
		environment: [["src/**", "knex"]],
		exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
		setTimeout: 10000
	}
});