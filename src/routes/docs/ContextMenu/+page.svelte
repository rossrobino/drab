<script>
	import ContextMenu from "$lib/components/ContextMenu.svelte";
</script>

<div class="flex justify-center rounded border border-dashed p-12">
	<div>Right click here</div>
	<ContextMenu>
		<div class="flex w-48 flex-col gap-2 rounded border bg-white p-2 shadow">
			<div class="font-bold">Context Menu</div>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
			<button role="menuitem" class="btn">Button</button>
		</div>
	</ContextMenu>
</div>
