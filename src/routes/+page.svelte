<script lang="ts">
	import { info, componentList } from "./docs";
	import Docs from "$lib/docs/Docs.svelte";
</script>

<svelte:head>
	<title>{info.packageName}</title>
	<meta name="description" content="An unstyled, reusable Svelte component library." />
	<meta name="keywords" content="Ross, Robino, Svelte, components" />
</svelte:head>

<div class="flex justify-center md:mx-4">
	<div class="basis-full md:basis-[768px]">
		<section class="my-0 bg-transparent pt-0 md:-mx-4">
			<h1>Documentation</h1>
			<p class="mb-2">
				The purpose of this library is to provide accessible, reusable, unstyled
				<a rel="external" href="https://svelte.dev">Svelte</a>
				components for anyone to use. This project can also be forked to easily
				<a href="#create">create your own</a>
				library and documentation.
			</p>
		</section>

		<section>
			<h2>Styling</h2>
			<p>
				All components have <code>class</code>
				and
				<code>id</code>
				props for reference and styling. Examples are styled with
				<a href="https://tailwindcss.com/">tailwindcss</a>
				using the
				<code>class</code>
				prop, although components are not shipped with any styles.
			</p>
		</section>
	</div>
</div>

<Docs {info} {componentList} />

<div class="mt-4 flex justify-center md:mx-4">
	<div class="basis-full md:basis-[768px]">
		<section>
			<h2 id="create">Create / Contribute</h2>
			<p>
				If you would like to create your own component library with this documentation page or
				contribute to this project, follow these steps.
			</p>
			<ul>
				<li>
					<a rel="external" href="https://docs.github.com/en/get-started/quickstart/fork-a-repo">
						Fork
					</a>
					this
					<a rel="external" href={info.gitHub}>repository</a>
				</li>
				<li>
					Add your component to <code>src/lib/components</code>
				</li>
				<li>
					Import and add an object documenting your component to the <code> componentList </code>
					array located at
					<code>src/routes/docs.ts</code>
				</li>
				<li>
					Test your component by running <code>npm run dev</code>
				</li>
				<li>
					Import component and export from <code> src/lib/index.js </code>
				</li>
				<li>
					If you are creating your own library, update <code> package.json </code>
					,
					<code>README.md</code>
					and
					<code>src/docs.ts</code>
					with your information
				</li>
				<li>
					Run <code>npm run package</code>
				</li>
				<li>
					If you want to contribute to this repo instead of maintaining your own, create a <a
						rel="external"
						href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork"
					>
						pull request
					</a>
				</li>
			</ul>
		</section>
	</div>
</div>
