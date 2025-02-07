import readmeMd from "./index.md?raw";
import { markdownProcessor } from "@/lib/md";
import type { Children } from "@robino/jsx";

export const Home = async () => {
	const { html } = await markdownProcessor.process(readmeMd);

	return <div class="prose">{html}</div>;
};
