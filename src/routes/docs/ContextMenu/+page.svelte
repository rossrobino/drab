<script lang="ts">
	import { ContextMenu } from "$lib";

	let target: HTMLButtonElement;
</script>

<div class="bg-muted mb-8 flex justify-center rounded border p-12">
	<div>Parent right click</div>
	<ContextMenu class="z-10">
		<div class="card flex w-48 flex-col gap-2 p-2 shadow-md">
			<div class="font-bold">Context Menu</div>
			<button role="menuitem" class="button button-secondary">Button</button>
			<button role="menuitem" class="button button-secondary">Button</button>
			<button role="menuitem" class="button button-secondary">Button</button>
		</div>
	</ContextMenu>
</div>

<button type="button" class="button button-primary" bind:this={target}>
	Target Right Click
</button>
<ContextMenu {target} class="z-10">
	<div class="card flex w-48 flex-col gap-2 p-2 shadow-md">
		<div class="font-bold">Target</div>
		<button role="menuitem" class="button button-secondary">Button</button>
		<button role="menuitem" class="button button-secondary">Button</button>
		<button role="menuitem" class="button button-secondary">Button</button>
	</div>
</ContextMenu>
