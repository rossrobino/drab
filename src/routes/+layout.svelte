<script>
	import "../app.postcss";
	import { info } from "./info";
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#18181b" />
	<meta name="msapplication-TileColor" content="#f4f4f5" />
	<meta name="theme-color" content="#18181b" />
</svelte:head>

<header class="bg-zinc-900 text-zinc-50 p-4 flex justify-center">
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

<footer class="bg-zinc-900 text-zinc-50 mt-4 flex justify-center">
	<div class="p-4 flex justify-between basis-full md:basis-[768px]">
		<a href={info.authorHomepage}>{info.author}</a>
		<span>{info.license} License</span>
	</div>
</footer>
