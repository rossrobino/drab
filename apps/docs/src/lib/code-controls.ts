import type { PluginSimple } from "markdown-it";
import type MarkdownIt from "markdown-it";
import { escape } from "ovr";

export const codeControls: PluginSimple = (md: MarkdownIt) => {
	const defaultFence =
		md.renderer.rules.fence ?? md.renderer.renderToken.bind(md.renderer);

	md.renderer.rules.fence = (tokens, i, opts, env, self) => {
		const token = tokens[i];

		if (!token?.markup?.startsWith("`"))
			return defaultFence(tokens, i, opts, env, self);

		const code = defaultFence(tokens, i, opts, env, self);
		const lang = token.info?.trim().split(/\s+/)[0] ?? "";
		const escaped = escape(token.content, true);

		return /* html */ `
<div class="bg-base-900 rounded-none sm:rounded-md my-6 -mx-6 sm:mx-0">
	<div class="flex justify-between items-center pt-px px-2 border-b border-base-800 gap-2">
		<div class="font-mono px-2 text-base-100 text-sm">${lang}</div>
		<div class="flex gap-2">
			${Copy(escaped)}
		</div>
	</div>
	${code}
</div>
`.trim();
	};
};

const Copy = (value: string) =>
	/* html */ `
<drab-copy value="${value}">
	<button
		data-trigger
		type="button"
		class="icon ghost bg-base-900 text-base-100"
		aria-label="copy code to clipboard"
	>
		<span data-content>
			<span class="icon-[lucide--clipboard-copy]"></span>
		</span>
		<template data-swap>
			<span class="icon-[lucide--clipboard-check]"></span>
		</template>
	</button>
</drab-copy>
`.trim();
