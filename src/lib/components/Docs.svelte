<script lang="ts">
	import type { Info, Component } from "../types";

	/** project information */
	export let info: Info;

	/** documentation of components in package */
	export let componentList: Component[];

	/** controls whether or not to render the header / footer */
	export let layout: boolean = true;

	/**
	 * returns an import statement string given the name of the component
	 * @param name - name of component
	 * @returns import statement
	 */
	function importString(name: string): string {
		return `import { ${name} } from "${info.packageName}";`;
	}

	/**
	 * stringifies the prop if not a string, adds quotes to string
	 * @param prop - any type
	 * @returns stringified version of the prop
	 */
	function exampleString(prop: any): string {
		if (typeof prop === "string") {
			return `"${prop}"`;
		} else if (typeof prop === "object") {
			return `{${JSON.stringify(prop)}}`;
		} else {
			return `{${prop}}`;
		}
	}
</script>

{#if layout}
	<header class="bg-zinc-900 text-zinc-50 p-4 flex justify-center">
		<div
			class="flex flex-col md:flex-row justify-between gap-2 basis-full md:basis-[768px]"
		>
			<h2 class="mt-0">{info.packageName}</h2>
			<ul class="flex items-center list-none mt-0">
				<li class="ml-0"><a href="/#install">Install</a></li>
				<li class="ml-4"><a href="/#components">Components</a></li>
				{#if !layout}
					<li class="ml-4"><a href="/#create">Create</a></li>
				{/if}
			</ul>
		</div>
	</header>
{/if}
<div class="md:mx-4 flex justify-center mt-4">
	<div class="basis-full md:basis-[768px]">
		<section>
			<h2 id="install">Install</h2>
			<div class="codeblock">
				<code>npm install -D {info.packageName}</code>
			</div>
		</section>
		<section>
			<h2 id="components">Components</h2>
			<ul>
				{#each componentList as component}
					<li>
						<a href={`#${component.name}`}>{component.name}</a>
					</li>
				{/each}
			</ul>
		</section>
		{#each componentList as component}
			<section>
				<a
					rel="external"
					class="flex gap-1.5 w-fit pr-8 hover:pr-2 group"
					href="{info.gitHub}/blob/main/src/lib/components/{component.name}.svelte"
				>
					<h2 id={component.name}>{component.name}</h2>
					<span class="hidden group-hover:flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm4.5-1.06a.75.75 0 10-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</a>

				<h3>Purpose</h3>
				<p>{component.purpose}</p>
				<h3>Usage</h3>
				<div class="codeblock">
					<code>
						<div>&lt;script&gt;</div>
						<div>
							&nbsp;&nbsp;&nbsp;&nbsp;{importString(
								component.name
							)}
						</div>
						<div>&lt;/script&gt;</div>
						<br />
						<div>&lt;{component.name}</div>
						{#each Object.keys(component.example) as prop, i}
							<div>
								&nbsp;&nbsp;&nbsp;&nbsp;{prop}={exampleString(
									Object.values(component.example)[i]
								)}
							</div>
						{/each}
						<div>/&gt;</div>
					</code>
				</div>
				<h3 class="mb-2">Preview</h3>
				<div>
					<svelte:component
						this={component.component}
						{...component.example}
					/>
				</div>
				{#if component.props?.length}
					<h3>Props</h3>
					<div class="overflow-x-auto">
						<table>
							<thead>
								<tr>
									<th>name</th>
									<th>purpose</th>
									<th>type</th>
									<th>default value</th>
								</tr>
							</thead>
							<tbody>
								{#each component.props as prop}
									<tr>
										<td>{prop.name}</td>
										<td>{prop.purpose}</td>
										<td>{prop.type}</td>
										<td>
											{#if prop.default === ""}
												""
											{:else}
												{prop.default}
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
				{#if component.slots?.length}
					<h3>Slots</h3>
					<table>
						<thead>
							<tr>
								<th>name</th>
								<th>purpose</th>
								<th>default value</th>
							</tr>
						</thead>
						<tbody>
							{#each component.slots as slot}
								<tr>
									<td>{slot.name}</td>
									<td>{slot.purpose}</td>
									<td>
										{slot.default}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				{#if component.references?.length}
					<h3>References</h3>
					<ul>
						{#each component.references as ref}
							<li><a href={ref.href}>{ref.name}</a></li>
						{/each}
					</ul>
				{/if}
			</section>
		{/each}
	</div>
</div>
{#if layout}
	<footer class="bg-zinc-900 text-zinc-50 mt-4 flex justify-center">
		<div class="p-4 flex justify-between basis-full md:basis-[768px]">
			<a href={info.authorHomepage}>{info.author}</a>
			<a href={`${info.gitHub}/blob/main/LICENSE.md`}>
				{info.license} License
			</a>
		</div>
	</footer>
{/if}

<style>
	.bg-zinc-900 {
		--tw-bg-opacity: 1;
		background-color: rgb(24 24 27 / var(--tw-bg-opacity));
	}
	.text-zinc-50 {
		--tw-text-opacity: 1;
		color: rgb(250 250 250 / var(--tw-text-opacity));
	}
	.hidden {
		display: none;
	}
	.flex {
		display: flex;
	}
	.group:hover .group-hover\:flex {
		display: flex;
	}
	.justify-center {
		justify-content: center;
	}
	.flex-col {
		flex-direction: column;
	}
	.justify-between {
		justify-content: space-between;
	}
	.basis-full {
		flex-basis: 100%;
	}
	.items-center {
		align-items: center;
	}
	.gap-2 {
		gap: 0.5rem /* 8px */;
	}
	.gap-1\.5 {
		gap: 0.375rem /* 6px */;
	}
	.p-4 {
		padding: 1rem /* 16px */;
	}
	.pr-8 {
		padding-right: 2rem /* 32px */;
	}
	.hover\:pr-2:hover {
		padding-right: 0.5rem /* 8px */;
	}
	.mt-0 {
		margin-top: 0px;
	}
	.ml-0 {
		margin-left: 0px;
	}
	.ml-4 {
		margin-left: 1rem /* 16px */;
	}
	.mb-2 {
		margin-bottom: 0.5rem /* 8px */;
	}
	.mt-4 {
		margin-top: 1rem /* 16px */;
	}
	.list-none {
		list-style-type: none;
	}
	.w-fit {
		width: fit-content;
	}
	.w-5 {
		width: 1.25rem /* 20px */;
	}
	.h-5 {
		height: 1.25rem /* 20px */;
	}
	.codeblock {
		margin-top: 0.5rem /* 8px */;
		margin-bottom: 0.5rem /* 8px */;
		--tw-bg-opacity: 1;
		background-color: rgb(24 24 27 / var(--tw-bg-opacity));
		--tw-text-opacity: 1;
		color: rgb(250 250 250 / var(--tw-text-opacity));
		padding: 1rem /* 16px */;
		overflow-x: auto;
		font-size: 0.875rem /* 14px */;
		line-height: 1.25rem /* 20px */;
	}
	.codeblock code {
		background-color: transparent;
		padding: 0px;
	}
	@media (min-width: 768px) {
		.md\:flex-row {
			flex-direction: row;
		}
	}
	@media (min-width: 768px) {
		.md\:mx-4 {
			margin-left: 1rem /* 16px */;
			margin-right: 1rem /* 16px */;
		}
	}
	@media (min-width: 768px) {
		.md\:basis-\[768px\] {
			flex-basis: 768px;
		}
	}
</style>
