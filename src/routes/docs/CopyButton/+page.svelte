<script lang="ts">
	import { CopyButton } from "$lib";

	let value = "";
</script>

<label for="copyInput" class="label">Text to Copy</label>
<input id="copyInput" class="input mb-4" type="text" bind:value />

<CopyButton class="button button-primary" blobParts={[value]} />
