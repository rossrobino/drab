import md from "$site/docs.md?raw";
import { mdToHtml } from "$site/util";

export const load = async () => {
	const html = mdToHtml(md);
	return { html };
};
