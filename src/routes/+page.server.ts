import md from "./docs.md?raw";
import { parse } from "marked";

export const prerender = true;

export const load = async () => {
	const html = parse(md);
	return { html };
};
