import { defineConfig } from "vite";

export default defineConfig({
	base: process.env.BASE_PATH || "/",
	server: { port: 3000 },
	build: {
		target: "es2022",
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				manualChunks: {
					babylon: ["@babylonjs/core"],
				},
			},
		},
	},
	test: {
		globals: true,
		environment: "node",
		exclude: ["e2e/**", "node_modules/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			include: ["src/**/*.ts"],
			exclude: [
				"src/**/*.test.ts",
				"src/test-utils/**",
				"src/vite-env.d.ts",
			],
		},
	},
});
