import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/package/index.ts",
		all: "src/package/all.ts",
		base: "src/package/base/define.ts",
		animate: "src/package/animate/define.ts",
		breakpoint: "src/package/breakpoint/define.ts",
		contextmenu: "src/package/contextmenu/define.ts",
		copy: "src/package/copy/define.ts",
		details: "src/package/details/define.ts",
		dialog: "src/package/dialog/define.ts",
		editor: "src/package/editor/define.ts",
		fullscreen: "src/package/fullscreen/define.ts",
		popover: "src/package/popover/define.ts",
		share: "src/package/share/define.ts",
		tablesort: "src/package/tablesort/define.ts",
		youtube: "src/package/youtube/define.ts",
	},
	outDir: "package",
	dts: true,
	format: ["esm", "iife", "cjs"],
	clean: true,
	minify: true,
});
