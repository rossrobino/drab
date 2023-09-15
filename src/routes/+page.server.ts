import md from "$site/md/README.md?raw";
import { process } from "robino/util/md";

export const load = async () => {
	const { html: readMe } = process(md);
	return { readMe };
};
