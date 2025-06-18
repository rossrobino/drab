import { processor } from "@/lib/md";
import { Chunk } from "ovr";

const elementDoc = import.meta.glob<string>("./generated/classes/*", {
	query: "?raw",
	import: "default",
	eager: true,
});

const styleDoc = import.meta.glob<string>("./styles/**/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
});

export const Docs = async (props: { name: string; demo: string }) => {
	const { name, demo } = props;

	const elementMd = elementDoc[`./generated/classes/${name}.md`];
	const styleMd = styleDoc[`./styles/${name}/index.md`];

	const { html: demoHtml } = await processor.process(
		`\`\`\`html\n${demo}\`\`\``,
	);

	const { html: docs } = await processor.process(
		`## Overview\n\n${elementMd ? elementMd : styleMd}`,
	);

	const install = elementMd
		? (
				await processor.process(
					`\`\`\`js\nimport "drab/${name}/define";\n\`\`\``,
				)
			).html
		: "";

	return (
		<>
			<h1>{name}</h1>
			<div
				aria-label="Element demo"
				class="flex justify-center overflow-x-auto rounded-md border border-dashed p-8"
			>
				<div class="w-full">{new Chunk(demo, true)}</div>
			</div>
			<div>
				{new Chunk(install, true)}
				{new Chunk(demoHtml, true)}
				{new Chunk(docs, true)}
			</div>
		</>
	);
};
