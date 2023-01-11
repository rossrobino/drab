<script>
	/** @type {string} */
	let className = "";

	/** @type {string} */
	let idName = "";

	/** @type {*} */
	export let uid;
	
	/** @type {string} */
	export let title = "";

	export { className as class, idName as id };
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
