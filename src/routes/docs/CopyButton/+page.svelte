<script lang="ts">
	import { CopyButton } from "$lib";

	let value = "Text to copy";
</script>

<input class="input mb-4" type="text" bind:value />

<CopyButton class="btn" blobParts={[value]} />
