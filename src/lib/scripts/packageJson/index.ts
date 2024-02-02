import fs from "node:fs/promises";

const main = async () => {
	const files = await fs.readdir("src/package", { withFileTypes: true });

	const packageJson = JSON.parse(await fs.readFile("package.json", "utf-8"));

	packageJson.exports = {
		".": {
			types: "./index.d.ts",
			default: "./index.js",
		},
		"./define": {
			types: "./define/index.d.ts",
			default: "./define/index.js",
		},
	};

	packageJson.keywords = ["web components", "custom elements"];

	for (const file of files) {
		if (file.name !== "types") {
			if (file.isDirectory()) {
				packageJson.exports[`./${file.name}`] = {
					types: `./${file.name}/index.d.ts`,
					default: `./${file.name}/index.js`,
				};
				packageJson.exports[`./${file.name}/define`] = {
					types: `./${file.name}/define.d.ts`,
					default: `./${file.name}/define.js`,
				};

				packageJson.keywords.push(file.name);
			}
		}
	}

	await fs.writeFile("package.json", JSON.stringify(packageJson, null, 4));
};

main();
