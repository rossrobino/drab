# drab 5.0.0

## Overview

Version 5 converts the library from Svelte components to custom elements.

Since drab already required users to provide most of the HTML via slots, the benefit of using Svelte to author the components was outweighed by the benefits of using custom elements, primarily the fact that custom elements can be [used in any framework](http://drab.robino.dev/getting-started/#frameworks).

drab's custom elements do not use the shadow DOM, so the contents of each element can still be server-side rendered with a framework. drab also works with client side rendering, drab pushes back the execution of `connectedCallback` to the end of the micro-task queue so frameworks like Svelte render the HTML within the custom element before `connectedCallback`.

I appreciate all of the interest in the library, I hope these updates will enable it to reach a broader range of users and projects.

---

## Migration

Example to convert a drab 4 Svelte component to utilize drab 5. See the [docs](https://drab.robino.dev) for updated examples of each component.

### drab 4

```svelte
<script lang="ts">
	import { Editor } from "drab";
</script>

<Editor
	classButton="button button-primary"
	classControls="flex gap-2"
	classTextarea="input h-36 mb-2"
	placeholderTextarea="asterisk: ctrl+i, anchor: ctrl+["
	contentElements={[
		{
			title: "Bullet",
			text: "- ",
			display: "block",
			icon: "Bullet",
		},
		{
			title: "Italic",
			text: "*",
			display: "wrap",
			icon: "Italic",
			key: "i",
			class: "italic",
		},
		{
			title: "Anchor",
			text: "[text](href)",
			display: "inline",
			icon: "Anchor",
			key: "[",
		},
	]}
/>
```

### drab 5

Ensure custom elements are being imported and defined in the browser only, since `window` is not available on the server. In Svelte, you can utilize `onMount`. This import only needs to run once for the element to be defined and used anywhere.

Instead of defining props with JavaScript, each prop is defined using HTML attributes instead. This authoring constraint has resulted in a much more consistent API that gives you complete access to the underlying markup. For example, you can see that you have more control over how each button is displayed and where it is rendered in relation to the `textarea`.

Instead of using slot props, drab identifies `trigger` and `content` elements via CSS selectors (default `data-trigger` and `data-content`), inspired by libraries such as Radix and Melt UI.

This also frees you from styling the components through props, you can now style the content of these elements however you like.

```svelte
<script>
	import { onMount } from "svelte";

	// only execute on the client
	onMount(async () => {
		// only define once
		if (!customElements.get("drab-editor")) {
			const { Editor } = await import("drab/editor");
			customElements.define("drab-editor", Editor);
		}
	});
</script>

<drab-editor>
	<textarea
		data-content
		class="input mb-2 h-36"
		placeholder="asterisk: ctrl+i, anchor: ctrl+["
	></textarea>
	<div class="flex gap-2">
		<button
			data-trigger
			data-value="- "
			data-type="block"
			data-key="i"
			class="button button-primary"
		>
			Bullet
		</button>
		<button
			data-trigger
			data-value="*"
			data-type="wrap"
			class="button button-primary italic"
		>
			Italic
		</button>
		<button
			data-trigger
			data-value="[text](href)"
			data-type="inline"
			data-key="["
			class="button button-primary"
		>
			Anchor
		</button>
	</div>
</drab-editor>
```

---

## Changes

### Animation

drab now uses the Web Animations API instead of Svelte's animations.

### Components

Each deprecated component is linked to a REPL to copy and paste if you need it.

You can also all of the version 4 components on [GitHub](https://github.com/rossrobino/drab/tree/6f6387b802c656ba430426ad0b089183848a62d2). Most of them don't have many imports, so you can easily copy and paste into your project if you don't want to upgrade to v5.

- `Sheet` has been replaced with a more general purpose `Dialog` which animates the native `HTMLDialogElement`.
- `Details` has improved accessibility by animating the content of the `HTMLDetailsElement` instead of creating a copy outside of the content.
- `Popover` now animates the Popover API instead of using a custom JS solution (not supported in FireFox currently).
- [FrettedChord](https://svelte.dev/repl/5771d5c3f3c34137a174c8c402ca0b2d?version=4.2.9) has been removed.
- [Tablature](https://svelte.dev/repl/58493c48090e4b53b49b4cf85c72630e?version=4.2.9) has been removed.
- [DataTable](https://svelte.dev/repl/8babcab952224548b5378e1daaf9274f?version=4.2.9) is now called `TableSort`, and no longer has pagination.

Besides the configuration, the functionality of other components remain unchanged.
