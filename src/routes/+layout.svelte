<script>
	import "../app.postcss";
</script>

<header
	class="bg-zinc-900 text-zinc-50 p-4 flex justify-center"
>
	<div
		class="flex flex-col md:flex-row justify-between gap-2 basis-full md:basis-[768px]"
	>
		<h2 class="mt-0">@rossrobino/components</h2>
		<ul class="flex items-center list-none mt-0">
			<li class="ml-0"><a href="/#install">Install</a></li>
			<li class="ml-4"><a href="/#components">Components</a></li>
			<li class="ml-4"><a href="/#create">Create</a></li>
		</ul>
	</div>
</header>

<main class="md:mx-4 flex justify-center">
	<div class="basis-full md:basis-[768px]">
		<slot />
	</div>
</main>

<footer
	class="bg-zinc-900 text-zinc-50 mt-4 flex justify-center"
>
	<div class="p-4 flex justify-between basis-full md:basis-[768px]">
		<a href="https://robino.dev">Ross Robino</a>
		<span>MIT License</span>
	</div>
</footer>
