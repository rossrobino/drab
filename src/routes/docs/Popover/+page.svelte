<script lang="ts">
	import { Popover } from "$lib";

	let target: HTMLButtonElement;

	let display = false;

	const open = () => (display = true);
	const close = () => (display = false);
</script>

<button
	class="button button-primary"
	type="button"
	bind:this={target}
	on:click={open}
>
	Open
</button>

<Popover {target} bind:display class="p-2">
	<div class="card flex w-48 flex-col gap-2 p-2 shadow-md">
		<div class="font-bold">Bottom</div>
		<button class="button button-secondary" on:click={close}>Close</button>
		<button class="button button-secondary" on:click={close}>Close</button>
		<button class="button button-secondary" on:click={close}>Close</button>
	</div>
</Popover>
