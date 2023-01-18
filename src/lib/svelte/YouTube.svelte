<script lang="ts">
	/** iframe class */
	let className: string = "";

	/** iframe id */
	let idName: string = "";

	export { className as class, idName as id };

	/** unique YouTube id*/
	export let uid: string;

	/** iframe title */
	export let title: string = "";
</script>

<iframe
	class={className}
	id={idName}
	src="https://www.youtube.com/embed/{uid}"
	{title}
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>
