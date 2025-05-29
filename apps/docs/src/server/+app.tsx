import type { FrontmatterSchema } from "@/lib/md";
import { Docs } from "@/pages/docs/docs";
import { Layout } from "@/server/layout";
import type { Result } from "@robino/md";
import { html } from "client:page";
import { App } from "ovr";

const pages = import.meta.glob<Result<typeof FrontmatterSchema>>(
	`@/pages/*.md`,
	{ eager: true },
);

const pagePaths = Object.keys(pages)
	.map((p) => {
		let pathname = p.split("/").at(2)?.split(".").at(0);
		if (pathname === "index") pathname = "";
		return pathname ? pathname : "";
	})
	.sort((a) => (a === "getting-started" ? -1 : 0));

const examples = import.meta.glob<string>(`@/pages/**/*.html`, {
	query: "?raw",
	import: "default",
	eager: true,
});

const examplePaths = Object.keys(examples).map((examplePath) => {
	// "{path}/index.html"
	return examplePath.slice(0, -"index.html".length) || "/";
});

const exampleSubPaths = examplePaths.map(
	(path) => `/${path.split("/").slice(3, 5).join("/")}/`,
);

const app = new App();

app.trailingSlash = "always";
app.base = html;
app.notFound = (c) => {
	c.head(<title>Not Found</title>);

	c.page(
		<Layout
			examples={exampleSubPaths}
			pages={pagePaths}
			pathname={c.url.pathname}
		>
			<h1>Not found</h1>
			<p>
				No content found at <code>{c.url.href}</code>.
			</p>
			<p>
				<a href="/">Return home</a>
			</p>
		</Layout>,
		404,
	);
};

app
	.get(["/", "/:slug/"], (c) => {
		const result =
			pages[`/pages/${"slug" in c.params ? c.params.slug : "index"}.md`];

		if (!result?.html) return;

		c.head(
			<>
				<title>{result.frontmatter.title}</title>
				<meta name="description" content={result.frontmatter.description} />
			</>,
		);

		return (
			<Layout
				examples={exampleSubPaths}
				pages={pagePaths}
				pathname={c.url.pathname}
			>
				{result.html}
			</Layout>
		);
	})
	.get(["/elements/:name/", "/styles/:name/"], (c) => {
		const example = examples[`/pages/docs${c.url.pathname}index.html`];
		const { name } = c.params;

		if (example) {
			c.head(
				<>
					<title>{`drab - ${name}`}</title>
					<meta
						name="description"
						content={`Learn how to use the ${name} custom element.`}
					/>
				</>,
			);

			return (
				<Layout
					examples={exampleSubPaths}
					pages={pagePaths}
					pathname={c.url.pathname}
				>
					<Docs name={name} demo={example} />
				</Layout>
			);
		}
	})
	.get("/docs/:name/", (c) => {
		// redirect from old docs
		if (c.params.name === "details" || c.params.name === "popover") {
			c.url.pathname = `/styles/${c.params.name}/`;
		} else {
			c.url.pathname = `/elements/${c.params.name}/`;
		}

		c.url.search = "";

		c.redirect(c.url, 308);
	})
	.get("/styles/details/", (c) => c.redirect("/styles/accordion/", 301));

app.prerender = ["/", "/getting-started/", ...exampleSubPaths];

export default app;
