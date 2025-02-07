import { markdownProcessor } from "@/lib/md";

const docMd = import.meta.glob("./generated/classes/*", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

export const Docs = async (props: { name: string; demo: string }) => {
	const { name, demo } = props;

	const md = docMd[`./generated/classes/${name}.md`];

	const { html } = await markdownProcessor.process(
		`\`\`\`html\n${demo}\`\`\`\n\n${md ? "## Overview\n\n" + md : ""}`,
	);

	return (
		<>
			<h1 class="mb-6">{name}</h1>
			<div class="flex justify-center overflow-x-auto rounded-md border border-dashed p-8">
				<div class="w-full">{demo}</div>
			</div>
			<div class="prose">{html}</div>
		</>
	);
};
