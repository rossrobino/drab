import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/package/index.ts",
		define: "src/package/define.ts",
		base: "src/package/base/index.ts",
		"base/define": "src/package/base/define.ts",
		animate: "src/package/animate/index.ts",
		"animate/define": "src/package/animate/define.ts",
		breakpoint: "src/package/breakpoint/index.ts",
		"breakpoint/define": "src/package/breakpoint/define.ts",
		contextmenu: "src/package/contextmenu/index.ts",
		"contextmenu/define": "src/package/contextmenu/define.ts",
		copy: "src/package/copy/index.ts",
		"copy/define": "src/package/copy/define.ts",
		details: "src/package/details/index.ts",
		"details/define": "src/package/details/define.ts",
		dialog: "src/package/dialog/index.ts",
		"dialog/define": "src/package/dialog/define.ts",
		editor: "src/package/editor/index.ts",
		"editor/define": "src/package/editor/define.ts",
		fullscreen: "src/package/fullscreen/index.ts",
		"fullscreen/define": "src/package/fullscreen/define.ts",
		popover: "src/package/popover/index.ts",
		"popover/define": "src/package/popover/define.ts",
		share: "src/package/share/index.ts",
		"share/define": "src/package/share/define.ts",
		tablesort: "src/package/tablesort/index.ts",
		"tablesort/define": "src/package/tablesort/define.ts",
		youtube: "src/package/youtube/index.ts",
		"youtube/define": "src/package/youtube/define.ts",
	},
	outDir: "package",
	dts: true,
	format: ["esm", "iife"],
	clean: true,
	minify: true,
	outExtension({ format }) {
		return {
			js: `${format === "esm" ? "" : `.${format}`}.js`,
		};
	},
});
