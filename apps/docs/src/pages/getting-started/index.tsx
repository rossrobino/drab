import gettingStarted from "./index.md?raw";
import { markdownProcessor } from "@/lib/md";
import { version } from "drab/package.json";

export const GettingStarted = async () => {
	const { html } = await markdownProcessor.process(gettingStarted);

	return <div class="prose">{html.replaceAll("__VERSION__", version)}</div>;
};
