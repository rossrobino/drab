<script>
	import Popover from "$lib/components/Popover.svelte"
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