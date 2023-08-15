import { mdToHtml } from "$site/util/mdToHtml";

export const load = async ({ route }) => {
	const title = route.id.split("/").at(-1);

	const { default: code } = await import(
		`../../lib/components/${title}.svelte?raw`
	);

	const md = code.split("@component")[1].split("-->")[0].trim();
	const lines = md.split("\n");
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith("###")) {
			lines[i] = "## Description";
		} else if (lines[i].startsWith("@")) {
			lines[i] = lines[i].slice(1);
			lines[i] = "## " + lines[i];
		}
	}
	const html = mdToHtml(lines.join("\n"));

	return { title, html };
};
