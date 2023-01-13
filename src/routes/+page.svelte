<script lang="ts">
	import { info } from "./docs";
	import ComponentDocs from "./ComponentDocs.svelte";
</script>

<svelte:head>
	<title>{info.packageName}</title>
	<meta
		name="description"
		content="An unstyled, reusable Svelte component library."
	/>
	<meta name="keywords" content="Ross, Robino, Svelte, components" />
</svelte:head>

<section class="bg-transparent md:-mx-4 my-0 pt-0">
	<h1>Documentation</h1>

	<p class="mb-2">
		The purpose of this library is to provide accessible, reusable, unstyled
		<a rel="external" href="https://svelte.dev">Svelte</a>
		components for anyone to use. This project can also be forked to easily
		<a href="#create">create your own</a>
		library and documentation.
	</p>
	<ul>
		<li>
			<a
				rel="external"
				href="https://www.npmjs.com/package/{info.packageName}"
			>
				npm
			</a>
		</li>
		<li>
			<a rel="external" href={info.gitHub}>GitHub</a>
		</li>
	</ul>
</section>

<section>
	<h2 id="install">Install</h2>
	<p>
		From your <a rel="external" href="https://kit.svelte.dev">SvelteKit</a>
		project directory, run the following command to add as a dev dependency.
	</p>
	<div class="codeblock">
		<code>npm install -D {info.packageName}</code>
	</div>
</section>

<ComponentDocs />

<section>
	<h2 id="create">Create / Contribute</h2>
	<p>
		If you would like to create your own component library with this
		documentation page or contribute to this project, follow these steps.
	</p>
	<ul>
		<li>
			<a
				rel="external"
				href="https://docs.github.com/en/get-started/quickstart/fork-a-repo"
			>
				Fork
			</a>
			this
			<a rel="external" href={info.gitHub}>repository</a>
		</li>
		<li>
			Add your component to <code>src/lib/svelte</code>
		</li>
		<li>
			Import and add an object documenting your component to the <code>
				componentList
			</code>
			array located at
			<code>src/routes/docs.ts</code>
		</li>
		<li>
			Test your component by running <code>npm run dev</code>
		</li>
		<li>
			Import component and export from <code>src/lib/index.js</code>
		</li>
		<li>
			If you are creating your own library, update <code>
				package.json
			</code>
			,
			<code>README.md</code>
			and
			<code>src/docs.ts</code>
			with your information
		</li>
		<li>
			Since the same project is used for the package and the docs website,
			<code>npm run packageBuild</code>
			will build your package to preserve
			<code>npm run build</code>
			for easy deployment to services like Vercel and Netlify
		</li>
		<li>
			If you want to contribute to this repo instead of maintaining your
			own, create a <a
				rel="external"
				href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork"
			>
				pull request
			</a>
		</li>
	</ul>
</section>
