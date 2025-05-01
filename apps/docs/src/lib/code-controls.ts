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
<div class="bg-base-800 rounded-none sm:rounded-md my-6 -mx-6 sm:mx-0 shadow-sm">
	<div class="flex justify-between items-center pt-px px-4 sm:px-2 border-b border-base-700 gap-2">
		<div class="font-mono px-2 text-base-200 text-sm">${lang}</div>
		${Share(escaped)}
	</div>
	${code}
</div>
`.trim();
	};
};

const Share = (value: string) =>
	/* html */ `
<drab-share value="${value}">
	<button
		data-trigger
		type="button"
		class="icon ghost bg-base-800 text-base-200"
		aria-label="copy code to clipboard"
	>
		<span data-content class="contents">
			<span class="icon-[lucide--clipboard-copy]"></span>
		</span>
		<template data-swap>
			<span class="icon-[lucide--clipboard-check]"></span>
		</template>
	</button>
</drab-share>
`.trim();
