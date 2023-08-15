import md from "$site/md/homepage.md?raw";
import { mdToHtml } from "$site/util/mdToHtml";

export const load = async () => {
	const homepage = mdToHtml(md);
	return { homepage };
};
