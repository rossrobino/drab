import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: {
			index: "src/package/index.ts",
			define: "src/package/define.ts",
			"base/index": "src/package/base/index.ts",
			"base/define": "src/package/base/define.ts",
			"animate/index": "src/package/animate/index.ts",
			"animate/define": "src/package/animate/define.ts",
			"breakpoint/index": "src/package/breakpoint/index.ts",
			"breakpoint/define": "src/package/breakpoint/define.ts",
			"contextmenu/index": "src/package/contextmenu/index.ts",
			"contextmenu/define": "src/package/contextmenu/define.ts",
			"copy/index": "src/package/copy/index.ts",
			"copy/define": "src/package/copy/define.ts",
			"details/index": "src/package/details/index.ts",
			"details/define": "src/package/details/define.ts",
			"dialog/index": "src/package/dialog/index.ts",
			"dialog/define": "src/package/dialog/define.ts",
			"editor/index": "src/package/editor/index.ts",
			"editor/define": "src/package/editor/define.ts",
			"fullscreen/index": "src/package/fullscreen/index.ts",
			"fullscreen/define": "src/package/fullscreen/define.ts",
			"popover/index": "src/package/popover/index.ts",
			"popover/define": "src/package/popover/define.ts",
			"prefetch/index": "src/package/prefetch/index.ts",
			"prefetch/define": "src/package/prefetch/define.ts",
			"share/index": "src/package/share/index.ts",
			"share/define": "src/package/share/define.ts",
			"tablesort/index": "src/package/tablesort/index.ts",
			"tablesort/define": "src/package/tablesort/define.ts",
			"wakelock/index": "src/package/wakelock/index.ts",
			"wakelock/define": "src/package/wakelock/define.ts",
			"youtube/index": "src/package/youtube/index.ts",
			"youtube/define": "src/package/youtube/define.ts",
		},
		outDir: "package",
		format: ["iife"],
		clean: true,
		minify: true,
		outExtension({ format }) {
			return {
				js: `${format === "esm" ? "" : `.${format}`}.js`,
			};
		},
	};
});
