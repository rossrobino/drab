<script>
	import { info, componentList } from "./docs";

	/**
	 * @param {string} name
	 * @return {string}
	 */
	function importString(name) {
		return `import { ${name} } from "${info.packageName}";`;
	}

	/**
	 * @param {*} prop
	 * @return {string}
	 */
	function exampleString(prop) {
		if (typeof prop === "string") {
			return `"${prop}"`;
		} else if (typeof prop === "object") {
			return JSON.stringify(prop);
		} else {
			return prop;
		}
	}
</script>

<section>
	<h2 id="components">Components</h2>
	<ul>
		{#each componentList as component}
			<li>
				<a href={`#${component.name}`}>{component.name}</a>
			</li>
		{/each}
	</ul>
	<h3>Styling</h3>
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

{#each componentList as component}
	<section>
		<a
			rel="external"
			class="flex gap-1.5 w-fit pr-8 hover:pr-2 group"
			href="{info.gitHub}/blob/main/src/lib/svelte/{component.name}.svelte"
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
					&nbsp;&nbsp;&nbsp;&nbsp;{importString(component.name)}
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
		{#if component.props.length}
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
		{#if component.slots.length}
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
		{#if component.references.length}
			<h3>References</h3>
			<ul>
				{#each component.references as ref}
					<li><a href={ref.href}>{ref.name}</a></li>
				{/each}
			</ul>
		{/if}
	</section>
{/each}
