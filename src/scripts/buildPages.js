import fs from "fs/promises";
import path from "path";

export const buildPages = async () => {
	const inDir = "src/lib/components";
	const outDir = "src/routes/docs";

	const files = await fs.readdir(inDir);

	/**
	 * @type {{componentDocs: string; code: string;}[]}
	 */
	for (const file of files) {
		if (path.extname(file) === ".svelte") {
			try {
				const title = file.split(".")[0];
				const code = await fs.readFile(path.join(inDir, file), "utf-8");
				const example = code.split("@example")[1].split("-->")[0].trim();
				const lines = example.split("\n");
				for (let i = 0; i < lines.length; i++) {
					if (lines[i].startsWith("```")) {
						lines[i] = "";
					} else if (lines[i].endsWith('drab";')) {
						lines[i] = `\timport ${title} from "$lib/components/${file}"`;
					}
				}
				const page = lines.join("\n").trim();
				const compDir = path.join(outDir, title);
				await fs.mkdir(compDir, { recursive: true });
				const fullPath = path.join(compDir, "+page.svelte");
				await fs.writeFile(fullPath, page);
				console.log("Built " + fullPath);
			} catch (error) {
				console.error(error);
			}
		}
	}
};

buildPages();
