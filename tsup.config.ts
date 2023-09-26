import { defineConfig } from "tsup";

export default defineConfig({
	entryPoints: ["src/**/*.ts", "knexfile.ts", "src/**/*.js"],
	format: ["cjs"],
	minify: false, 
	sourcemap: true, 
	outDir: "build", 
	target: "node16",
	tsconfig: "./tsconfig.json",
    
});