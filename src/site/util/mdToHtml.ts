import { marked } from "marked";

export const mdToHtml = (md: string) => {
	return marked.parse(md);
};
