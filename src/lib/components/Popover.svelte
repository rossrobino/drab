<!--
@component

### Popover

Displays a popover relatively positioned to the button.

@props

- `classButton` - `button` class
- `classPopover` - popover class
- `class` 
- `display` - if `eventType="click"`, controls the display
- `eventType` - controls if hovering or clicking the button displays the popover
- `idButton` - `button` id
- `idPopover` - popover id
- `id` 
- `position` - where the popover is displayed in relation to the button

@slots

| name       | purpose                         | default value |
| ---------- | ------------------------------- | ------------- |
| `default`  | default                         | Popover       |
| `button`   | button contents                 | Open          |

@example

```svelte
<script>
	import { Popover } from "drab";
</script>

<Popover classButton="btn" classPopover="p-2 transition">
	<span slot="button">Hover</span>
	<div class="card flex w-48 flex-col gap-2">
		<div class="font-bold">Bottom</div>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
	</div>
</Popover>
<Popover
	classButton="btn"
	classPopover="p-2 transition"
	eventType="click"
	position="right"
>
	<span slot="button">Click</span>
	<div class="card flex w-48 flex-col gap-2">
		<div class="font-bold">Right</div>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
		<button class="btn">Button</button>
	</div>
</Popover>
```
-->

<script lang="ts">
	import { onMount, tick } from "svelte";

	let className = "";
	export { className as class };

	export let id = "";

	/** `button` class */
	export let classButton = "";

	/** popover class */
	export let classPopover = "";

	/** `button` id */
	export let idButton = "";

	/** popover id */
	export let idPopover = "";

	/** if `eventType="click"`, controls the display */
	export let display = false;

	/** where the popover is displayed in relation to the button */
	export let position: "top" | "bottom" | "left" | "right" = "bottom";

	type EventType = "click" | "hover";

	/** controls if hovering or clicking the button displays the popover */
	export let eventType: EventType = "hover";

	/** set to `eventType` on mount in case of no js*/
	let clientEventType: EventType = "hover";

	let popover: HTMLDivElement;

	let button: HTMLButtonElement;

	let coordinates: { x: number; y: number } = { x: 0, y: 0 };

	/** corrects the position if the popover is out of the viewport */
	const correctPosition = async () => {
		if (position === "top" || position === "bottom") {
			coordinates.x = button.offsetWidth / 2 - popover.offsetWidth / 2;
			if (position === "top") {
				coordinates.y = -popover.offsetHeight;
			} else {
				coordinates.y = button.offsetHeight;
			}
		} else {
			coordinates.y = button.offsetHeight / 2 - popover.offsetHeight / 2;
			if (position === "left") {
				coordinates.x = -popover.offsetWidth;
			} else {
				coordinates.x = button.offsetWidth;
			}
		}

		await tick();

		const rect = popover.getBoundingClientRect();

		if (rect.x < 0) {
			coordinates.x += Math.abs(rect.x);
		} else if (rect.x + popover.offsetWidth > window.innerWidth) {
			coordinates.x -= rect.x + popover.offsetWidth - window.innerWidth + 16;
		}
		if (rect.y < 0) {
			coordinates.y += Math.abs(rect.y);
		} else if (rect.y + popover.offsetHeight > window.innerHeight) {
			coordinates.y -= rect.y + popover.offsetHeight - window.innerHeight;
		}
	};

	const clickOutside = (e: MouseEvent) => {
		if (popover && e.target instanceof HTMLElement) {
			if (!popover.contains(e.target)) {
				display = false;
			}
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			display = false;
		}
	};

	const openPopover = async (e: MouseEvent) => {
		e.stopPropagation();
		display = true;
	};

	onMount(() => {
		clientEventType = eventType; // no js = "hover"
		correctPosition();
	});
</script>

<svelte:body on:keydown={onKeyDown} on:click={clickOutside} />

<div class="db-relative {className}" {id}>
	<button
		bind:this={button}
		id={idButton}
		class={classButton}
		on:click={openPopover}
		on:mouseover={correctPosition}
		on:focus={correctPosition}
	>
		<slot name="button">Open</slot>
	</button>
	<div
		bind:this={popover}
		id={idPopover}
		class="db-popover {classPopover}"
		class:db-type-click={clientEventType === "click" && display}
		class:db-type-hover={clientEventType === "hover"}
		style:top="{coordinates.y}px"
		style:left="{coordinates.x}px"
		inert={clientEventType === "hover" || display ? false : true}
	>
		<slot>Popover</slot>
	</div>
</div>

<style>
	.db-relative {
		position: relative;
	}
	.db-popover {
		position: absolute;
		opacity: 0;
		z-index: -10;
	}
	button:hover + .db-type-hover,
	button:focus + .db-type-hover,
	.db-type-hover:hover,
	.db-type-hover:focus-within,
	.db-type-click {
		opacity: 1;
		z-index: 10;
	}
</style>
