import md from "$site/md/README.md?raw";
import { mdToHtml } from "$site/util/mdToHtml";

export const load = async () => {
	const readMe = mdToHtml(md);
	return { readMe };
};
