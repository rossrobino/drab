import fs from "node:fs/promises";

const main = async () => {
	const files = await fs.readdir("src/package", { withFileTypes: true });

	console.log(files);

	const packageJson = JSON.parse(await fs.readFile("package.json", "utf-8"));

	packageJson.exports = {
		".": {
			types: "./index.d.ts",
			default: "./index.js",
		},
		"./define": {
			types: "./define.d.ts",
			default: "./define.js",
		},
	};

	for (const file of files) {
		if (file.isDirectory()) {
			packageJson.exports[`./${file.name}`] = {
				types: `./${file.name}.d.ts`,
				default: `./${file.name}.js`,
			};
			packageJson.exports[`./${file.name}/define`] = {
				types: `./${file.name}/define.d.ts`,
				default: `./${file.name}/define.js`,
			};
		}
	}

	await fs.writeFile("package.json", JSON.stringify(packageJson, null, 4));
};

main();
