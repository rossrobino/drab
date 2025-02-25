import readmeMd from "./index.md?raw";
import { processor } from "@/lib/md";
import type { Children } from "@robino/jsx";

export const Home = async () => {
	const { html } = await processor.process(readmeMd);

	return <div class="prose">{html}</div>;
};
