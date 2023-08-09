<!--
@component

### ContextMenu

Displays when the parent element is right clicked.

@props

- `class` 
- `display` - controls `display` css property
- `id` 

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | Context Menu  |

@example

```svelte
<script>
    import { ContextMenu } from "drab";
</script>

<div class="p-12 border border-dashed flex justify-center">
	<div>Right click here</div>
	<ContextMenu class="rounded shadow p-2 bg-white">
		<div class="flex flex-col gap-2 not-prose w-48">
			<div class="font-bold">Context Menu</div>
			<button class="btn">Button</button>
			<button class="btn">Button</button>
			<button class="btn">Button</button>
		</div>
	</ContextMenu>
</div>
```
-->

<script lang="ts">
	import { onMount, tick } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	/** controls `display` css property */
	export let display = false;

	let contextMenu: HTMLDivElement;

	let position: { x: number; y: number } = { x: 0, y: 0 };

	const hide = () => (display = false);

	onMount(() => {
		const parent = contextMenu.parentElement;

		if (parent) {
			parent.addEventListener("contextmenu", async (e) => {
				if (contextMenu) {
					e.preventDefault();
					const scrollY = window.scrollY;
					position.x = e.clientX;
					position.y = e.clientY + scrollY;
					display = true;

					await tick(); // wait for menu to show

					const offsetWidth = contextMenu.offsetWidth + 24;
					const offsetHeight = contextMenu.offsetHeight + 6;
					const innerWidth = window.innerWidth;
					const innerHeight = window.innerHeight;

					// ensure menu is within view
					if (position.x + offsetWidth > innerWidth) {
						position.x = innerWidth - offsetWidth;
					}
					if (position.y + offsetHeight > scrollY + innerHeight) {
						position.y = scrollY + innerHeight - offsetHeight;
					}
				}
			});
		}
	});
</script>

<svelte:document on:click={hide} />

<div
	class={className}
	{id}
	bind:this={contextMenu}
	style="display: {display
		? 'block'
		: 'none'}; top: {position.y}px; left: {position.x}px;"
>
	<slot>Context Menu</slot>
</div>

<style>
	div {
		position: absolute;
	}
</style>
