<script lang="ts">
	import ContextMenu from "$lib/components/ContextMenu.svelte";

	let target: HTMLButtonElement;
</script>

<div class="mb-8 flex justify-center rounded border border-dashed p-12">
	<div>Parent right click</div>
	<ContextMenu>
		<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
			<div class="font-bold">Context Menu</div>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
		</div>
	</ContextMenu>
</div>

<button class="btn" bind:this={target}>Target Right Click</button>
<ContextMenu {target}>
	<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
		<div class="font-bold">Context Menu</div>
		<button role="menuitem" class="btn">Button</button>
		<button role="menuitem" class="btn">Button</button>
		<button role="menuitem" class="btn">Button</button>
	</div>
</ContextMenu>
