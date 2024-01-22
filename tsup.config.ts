import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/package/index.ts",
		all: "src/package/all.ts",
		animate: "src/package/animate/define.ts",
		base: "src/package/base/define.ts",
		copy: "src/package/copy/define.ts",
		details: "src/package/details/define.ts",
		dialog: "src/package/dialog/define.ts",
		editor: "src/package/editor/define.ts",
		fullscreen: "src/package/fullscreen/define.ts",
		share: "src/package/share/define.ts",
		youtube: "src/package/youtube/define.ts",
	},
	outDir: "src/package/dist",
	dts: true,
	format: ["esm", "iife", "cjs"],
	clean: true,
	minify: true,
});
