import type { FrontmatterSchema } from "@/lib/md";
import { Docs } from "@/pages/docs/docs";
import { Layout } from "@/server/layout";
import type { Result } from "@robino/md";
import { App, type Middleware, Render, Route } from "ovr";

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

const app = new App({ trailingSlash: "always" });

const notFound: Middleware = async (c, next) => {
	await next();

	if (c.res.body === undefined) {
		c.res.status = 404;

		return (
			<Layout
				examples={exampleSubPaths}
				pages={pagePaths}
				pathname={c.url.pathname}
				head={<title>Not Found</title>}
			>
				<h1>Not found</h1>
				<p>
					No content found at <code>{c.url.href}</code>.
				</p>
				<p>
					<a href="/">Return home</a>
				</p>
			</Layout>
		);
	}
};

const content: Middleware = (c) => {
	const result =
		pages[`/pages/${"slug" in c.params ? c.params.slug : "index"}.md`];

	if (!result?.html) return;

	return (
		<Layout
			examples={exampleSubPaths}
			pages={pagePaths}
			pathname={c.url.pathname}
			head={
				<>
					<title>{result.frontmatter.title}</title>
					<meta name="description" content={result.frontmatter.description} />
				</>
			}
		>
			{Render.html(result.html)}
		</Layout>
	);
};

const elements: Middleware = (c) => {
	const example = examples[`/pages/docs${c.url.pathname}index.html`];
	const { name } = c.params;

	if (example && name) {
		return (
			<Layout
				examples={exampleSubPaths}
				pages={pagePaths}
				pathname={c.url.pathname}
				head={
					<>
						<title>{`drab - ${name}`}</title>
						<meta
							name="description"
							content={`Learn how to use the ${name} custom element.`}
						/>
					</>
				}
			>
				<Docs name={name} demo={example} />
			</Layout>
		);
	}
};

app.use(
	notFound,
	Route.get("/", content),
	Route.get("/:slug/", content),
	Route.get("/elements/:name/", elements),
	Route.get("/styles/:name/", elements),
	Route.get("/docs/:name/", (c) => {
		// redirect from old docs
		if (c.params.name === "details" || c.params.name === "popover") {
			c.url.pathname = `/styles/${c.params.name}/`;
		} else {
			c.url.pathname = `/elements/${c.params.name}/`;
		}

		c.url.search = "";

		c.redirect(c.url, 308);
	}),
	Route.get("/styles/details/", (c) => c.redirect("/styles/accordion/", 301)),
	Route.get("/elements/dialog/", (c) => c.redirect("/styles/dialog/", 301)),
);

export default {
	fetch: app.fetch,
	prerender: ["/", "/getting-started/", ...exampleSubPaths],
};
