import { codeControls } from "./code-controls";
import { Processor, type Options } from "@robino/md";
import langAstro from "shiki/langs/astro.mjs";
import langBash from "shiki/langs/bash.mjs";
import langHtml from "shiki/langs/html.mjs";
import langSvelte from "shiki/langs/svelte.mjs";
import langTs from "shiki/langs/ts.mjs";
import langTsx from "shiki/langs/tsx.mjs";
import langVue from "shiki/langs/vue.mjs";
import * as z from "zod";

export const options: Options = {
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
	plugins: [codeControls],
};

export const processor = new Processor(options);

export const FrontmatterSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
});
