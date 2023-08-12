<!--
@component

### Tabs

Displays tabs and slotted content.

@props

- `classButtonActive` - class of the active tab's `button`
- `classButtonInactive` - class of all the inactive tabs' `button`s
- `classButton` - `button` class
- `classHeader` - class of the `div` that wraps the `button`s
- `classNoscript` - `noscript` class
- `classSlot` - class of `div` that wraps the slotted content
- `class` 
- `content` - array of `TabContent` elements
- `id` 
- `transition` - fades the content in, defaults to empty object, set to false to remove

@slots

Pass components into the `content` prop if needed. `TabsContent` has a `slot` attribute of type `string | ComponentType`.

@example

```svelte
<script>
    import { Tabs } from "drab";
	import { FullscreenButton } from "drab";
</script>

<Tabs content={[
		{ name: "String", slot: "Slot" },
		{ name: "Component", slot: FullscreenButton },
	]}
/>
```
-->

<script context="module" lang="ts">
	import type { ComponentType } from "svelte";

	export interface TabsContent {
		/** tab name, displayed in `button` element */
		name: string;

		/** slotted content, displayed once tab is clicked */
		slot: string | ComponentType;

		/** class of the slotted content */
		classContentSlot?: string;
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { fade, type FadeParams } from "svelte/transition";
	import { messageNoScript } from "$lib/util/messages";

	let className = "";
	export { className as class };

	export let id = "";

	/** class of the `div` that wraps the `button`s */
	export let classHeader = "";

	/** `button` class */
	export let classButton = "";

	/** class of the active tab's `button` */
	export let classButtonActive = "";

	/** class of all the inactive tabs' `button`s */
	export let classButtonInactive = "";

	/** `noscript` class */
	export let classNoscript = "";

	/** class of `div` that wraps the slotted content */
	export let classSlot = "";

	/** array of `TabContent` elements */
	export let content: TabsContent[];

	/** fades the content in, defaults to empty object, set to false to remove */
	export let transition: FadeParams | false = {};

	const fadeTransition: FadeParams = transition ? transition : { duration: 0 };

	/** sets to `true` on the client */
	let clientJs = false;

	let activeIndex = 0;

	for (const item of content) {
		if (!item.classContentSlot) item.classContentSlot = "";
	}

	$: activeTab = content[activeIndex];

	onMount(() => (clientJs = true));
</script>

<div class={className} {id}>
	<div class={classHeader}>
		{#each content as { name }, i}
			<button
				disabled={!clientJs}
				class="{classButton} {activeIndex === i
					? classButtonActive
					: ''} {activeIndex !== i ? classButtonInactive : ''}"
				on:click={() => (activeIndex = i)}
			>
				{name}
			</button>
		{/each}
	</div>
	<div class={classSlot}>
		{#if typeof activeTab.slot !== "string"}
			<div in:fade={fadeTransition}>
				<svelte:component
					this={activeTab.slot}
					class={activeTab.classContentSlot}
				/>
			</div>
		{:else}
			<div in:fade={fadeTransition} class={activeTab.classContentSlot}>
				{activeTab.slot}
			</div>
		{/if}
	</div>
	<noscript>
		<div class={classNoscript}>
			{messageNoScript}
		</div>
	</noscript>
</div>
