<script>
	import ContextMenu from "$lib/components/ContextMenu.svelte";
</script>

<div class="flex justify-center rounded border border-dashed p-12">
	<div>Right click here</div>
	<ContextMenu class="transition">
		<div class="card flex w-48 flex-col gap-2">
			<div class="font-bold">Context Menu</div>
			<button class="btn">Button</button>
			<button class="btn">Button</button>
			<button class="btn">Button</button>
		</div>
	</ContextMenu>
</div>
