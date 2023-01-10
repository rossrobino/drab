<script>
	let className = "";
	let idName = "";
	export { className as class, idName as id };
	export let uid = "";
	export let title = "";
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
