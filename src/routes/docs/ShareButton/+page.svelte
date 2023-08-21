<script lang="ts">
	import { ShareButton } from "$lib";

	let fileInput: HTMLInputElement;

	let fileShareData: ShareData;

	const onInput = () => {
		if (fileInput.files) {
			fileShareData.files = [fileInput.files[0]];
		}
	};
</script>

<ShareButton
	class="btn mb-8"
	shareData={{
		text: "Check out this page: ",
		title: "drab",
		url: "https://drab.robino.dev",
	}}
>
	Share URL
</ShareButton>

<div>
	<label class="label" for="fileInput">Upload File</label>
	<input
		type="file"
		id="fileInput"
		class="input mb-4"
		bind:this={fileInput}
		on:input={onInput}
	/>
	<ShareButton class="btn" bind:shareData={fileShareData}>
		Share File
	</ShareButton>
</div>
