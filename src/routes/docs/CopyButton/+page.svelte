<script lang="ts">
	import { CopyButton } from "$lib";

	let value = "";
</script>

<input
	class="input mb-4"
	type="text"
	placeholder="Enter text to copy"
	bind:value
/>

<CopyButton class="button button-primary" blobParts={[value]} />
