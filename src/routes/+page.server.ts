import md from "./docs.md?raw";
import { marked } from "marked";

export const prerender = true;

export const load = async () => {
	const html = marked.parse(md);
	return { html };
};
