<!--
@component

### ContextMenu

Displays when the parent element is right clicked.

@props

- `classNoscript` - `noscript` class
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

<div>
	<div>Right click here</div>
	<ContextMenu>
		<div>
			<div>Context Menu</div>
			<button>Button</button>
			<button>Button</button>
			<button>Button</button>
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

	/** `noscript` class */
	export let classNoscript = "";

	let contextMenu: HTMLDivElement;

	let coordinates: { x: number; y: number } = { x: 0, y: 0 };

	const hide = () => (display = false);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	onMount(() => {
		const parentElement = contextMenu.parentElement;

		if (parentElement) {
			parentElement.addEventListener("contextmenu", async (e) => {
				if (contextMenu) {
					e.preventDefault();
					const scrollY = window.scrollY;
					const scrollX = window.scrollX;
					coordinates.x = e.clientX + scrollX;
					coordinates.y = e.clientY + scrollY;
					display = true;

					await tick(); // wait for menu to show

					const offsetWidth = contextMenu.offsetWidth + 24;
					const offsetHeight = contextMenu.offsetHeight + 6;
					const innerWidth = window.innerWidth;
					const innerHeight = window.innerHeight;

					// ensure menu is within view
					if (coordinates.x + offsetWidth > scrollX + innerWidth) {
						coordinates.x = scrollX + innerWidth - offsetWidth;
					}
					if (coordinates.y + offsetHeight > scrollY + innerHeight) {
						coordinates.y = scrollY + innerHeight - offsetHeight;
					}
				}
			});
		}
	});
</script>

<svelte:document on:click={hide} on:keydown={onKeyDown} />

<div
	class={className}
	{id}
	bind:this={contextMenu}
	style:z-index={display ? "10" : "-10"}
	style:opacity={display ? "100%" : "0%"}
	style:top="{coordinates.y}px"
	style:left="{coordinates.x}px"
	inert={display ? false : true}
>
	<slot>Context Menu</slot>
</div>

<noscript>
	<div class={classNoscript}>
		<slot />
	</div>
</noscript>

<style>
	div {
		position: absolute;
		z-index: 1;
	}
</style>
