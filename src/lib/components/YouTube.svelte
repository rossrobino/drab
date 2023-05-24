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

	/** auto-plays the video */
	export let autoplay = false;

	/** start time (seconds) */
	export let start = 0;
</script>

<iframe
	class={className}
	id={idName}
	src="https://www.youtube-nocookie.com/embed/{uid}?start={start}{autoplay
		? '&autoplay=1'
		: ''}"
	{title}
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>
