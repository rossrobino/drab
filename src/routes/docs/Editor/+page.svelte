<script lang="ts">
	import { Editor } from "$lib";
</script>

<Editor
	classButton="btn"
	classControls="flex gap-2"
	classTextarea="border w-full h-36 p-2 rounded mb-2"
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
