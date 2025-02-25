import gettingStarted from "./index.md?raw";
import { processor } from "@/lib/md";
import { version } from "drab/package.json";

export const GettingStarted = async () => {
	const { html } = await processor.process(gettingStarted);

	return <div class="prose">{html.replaceAll("__VERSION__", version)}</div>;
};
