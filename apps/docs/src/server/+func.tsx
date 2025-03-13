import { Home } from "@/pages";
import { Docs } from "@/pages/docs";
import { GettingStarted } from "@/pages/getting-started";
import { RootLayout } from "@/pages/layout";
import { Router } from "@robino/router";
import { html } from "client:page";
import type { Prerender } from "domco";
import { description } from "drab/package.json";

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

export const prerender: Prerender = new Set([
	"/",
	"/getting-started/",
	...exampleSubPaths,
]);

const app = new Router({
	trailingSlash: "always",
	html,
	notFound: (c) => {
		c.res.html((p) => {
			p.head(<title>drab - Not Found</title>).body(
				<RootLayout examples={exampleSubPaths} pathname={c.req.url.pathname}>
					<h1>Not found</h1>
				</RootLayout>,
			);
		});
	},
})
	.get("/", (c) => {
		c.res.html((p) => {
			p.head(
				<>
					<title>drab</title>
					<meta name="description" content={description} />
				</>,
			).body(
				<RootLayout examples={exampleSubPaths} pathname={c.req.url.pathname}>
					<Home />
				</RootLayout>,
			);
		});
	})
	.get("/getting-started/", (c) => {
		c.res.html((p) => {
			p.head(
				<>
					<title>drab - Getting Started</title>
					<meta
						name="description"
						content="How to start using drab custom elements."
					/>
				</>,
			).body(
				<RootLayout examples={exampleSubPaths} pathname={c.req.url.pathname}>
					<GettingStarted />
				</RootLayout>,
			);
		});
	})
	.get(["/elements/:name/", "/styles/:name/"], (c) => {
		const example = examples[`/pages/docs${c.req.url.pathname}index.html`];
		const { name } = c.params;

		if (example) {
			c.res.html((p) => {
				p.head(
					<>
						<title>{`drab - ${name}`}</title>
						<meta
							name="description"
							content={`Learn how to use the ${name} custom element.`}
						/>
					</>,
				).body(
					<RootLayout examples={exampleSubPaths} pathname={c.req.url.pathname}>
						<Docs name={name} demo={example} />
					</RootLayout>,
				);
			});
		}
	})
	.get("/docs/:name/", (c) => {
		// redirect from old docs
		if (c.params.name === "details" || c.params.name === "popover") {
			c.req.url.pathname = `/styles/${c.params.name}/`;
		} else {
			c.req.url.pathname = `/elements/${c.params.name}/`;
		}

		c.req.url.search = "";

		c.res.redirect(c.req.url, 308);
	});

export const handler = app.fetch;
