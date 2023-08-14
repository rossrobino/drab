<script>
	import Editor from "$lib/components/Editor.svelte";
</script>

<Editor
	classButton="btn"
	classControls="flex gap-2"
	classTextarea="border w-full h-36 p-2 rounded"
	placeholderTextarea="asterisk: ctrl+i, anchor: ctrl+["
	contentElements={[
		{
			name: "Bullet",
			text: "- ",
			display: "block",
			icon: "Bullet",
		},
		{
			name: "Asterisk",
			text: "*",
			display: "wrap",
			icon: "Asterisk",
			key: "i",
			class: "italic",
		},
		{
			name: "Anchor",
			text: "[text](href)",
			display: "inline",
			icon: "Anchor",
			key: "[",
		},
	]}
/>
