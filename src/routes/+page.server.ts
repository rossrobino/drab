import md from "$site/homepage.md?raw";
import { mdToHtml } from "$site/util";

export const load = async () => {
	const homepage = mdToHtml(md);
	return { homepage };
};
