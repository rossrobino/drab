import gettingStarted from "./index.md?raw";
import { processor } from "@/lib/md";

export const GettingStarted = async () => {
	const { html } = await processor.process(gettingStarted);

	return <div class="prose">{html}</div>;
};
