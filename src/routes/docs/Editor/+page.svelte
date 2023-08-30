<script lang="ts">
	import { Editor } from "$lib";
</script>

<Editor
	classButton="button button-primary"
	classControls="flex gap-2"
	classTextarea="input w-full h-36 mb-2"
	placeholderTextarea="asterisk: ctrl+i, anchor: ctrl+["
	contentElements={[
		{
			title: "Bullet",
			text: "- ",
			display: "block",
			icon: "Bullet",
		},
		{
			title: "Italic",
			text: "*",
			display: "wrap",
			icon: "Italic",
			key: "i",
			class: "italic",
		},
		{
			title: "Anchor",
			text: "[text](href)",
			display: "inline",
			icon: "Anchor",
			key: "[",
		},
	]}
/>
