import { MarkdownProcessor } from "@robino/md";
import langAstro from "shiki/langs/astro.mjs";
import langBash from "shiki/langs/bash.mjs";
import langHtml from "shiki/langs/html.mjs";
import langTsx from "shiki/langs/tsx.mjs";
import langSvelte from "shiki/langs/svelte.mjs";
import langTs from "shiki/langs/ts.mjs";
import langVue from "shiki/langs/vue.mjs";

/** A markdown processor */
export const markdownProcessor = new MarkdownProcessor({
	highlighter: {
		langs: [
			langHtml,
			langTs,
			langBash,
			langTsx,
			langSvelte,
			langVue,
			langAstro,
		],
	},
});
