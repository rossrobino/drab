import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";
import hljs from "highlight.js/lib/common";

marked.use(markedSmartypants());
marked.use(
	markedHighlight({
		langPrefix: "hljs language-",
		highlight: (code, lang) => {
			let language = "plaintext";
			if (hljs.getLanguage(lang)) {
				language = lang;
			} else if (lang === "svelte") {
				language = "html";
			}
			return hljs.highlight(code, { language }).value;
		},
	}),
);

export const mdToHtml = (md: string) => {
	return marked.parse(md);
};
