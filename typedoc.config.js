/** @import { TypeDocOptions } from "typedoc" */
/** @import { PluginOptions } from "typedoc-plugin-markdown" */

/** @type {PluginOptions} */
const markdownOptions = {
	plugin: ["typedoc-plugin-markdown"],
	outputFileStrategy: "members",
	hidePageHeader: true,
	hidePageTitle: true,
	useHTMLAnchors: true,
	formatWithPrettier: true,
	hideBreadcrumbs: true,
};

/** @type {Partial<TypeDocOptions & PluginOptions>} */
export default {
	entryPoints: ["packages/drab/src/index.ts"],
	out: "apps/docs/src/pages/docs/generated",
	plugin: ["typedoc-plugin-markdown"],
	gitRevision: "main",
	tsconfig: "packages/drab/tsconfig.json",
	excludeExternals: true,
	publicPath: "/PUBLIC_PATH/",
	...markdownOptions,
};
