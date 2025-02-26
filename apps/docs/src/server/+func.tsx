import { Home } from "@/pages";
import { Docs } from "@/pages/docs";
import { GettingStarted } from "@/pages/getting-started";
import { RootLayout } from "@/pages/layout";
import { Page } from "@robino/html";
import { Router } from "@robino/router";
import { html } from "client:page";
import type { Prerender } from "domco";
import { description } from "drab/package.json";

const examples = import.meta.glob(`@/pages/**/*.html`, {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

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
	start: () => ({ page: new Page(html) }),
	notFound: ({ state, url }) => {
		return state.page
			.head(<title>drab - Not Found</title>)
			.body(
				<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
					<h1>Not found</h1>
				</RootLayout>,
			)
			.toResponse();
	},
})
	.get("/", ({ state, url }) => {
		return state.page
			.head(
				<>
					<title>drab</title>
					<meta name="description" content={description} />
				</>,
			)
			.body(
				<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
					<Home />
				</RootLayout>,
			)
			.toResponse();
	})
	.get("/getting-started/", ({ state, url }) => {
		return state.page
			.head(
				<>
					<title>drab - Getting Started</title>
					<meta
						name="description"
						content="How to start using drab custom elements."
					/>
				</>,
			)
			.body(
				<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
					<GettingStarted />
				</RootLayout>,
			)
			.toResponse();
	})
	.get(["/elements/:name/", "/styles/:name/"], ({ url, state, params }) => {
		const example = examples[`/pages/docs${url.pathname}index.html`];
		const { name } = params;

		if (example) {
			return state.page
				.head(
					<>
						<title>{`drab - ${name}`}</title>
						<meta
							name="description"
							content={`Learn how to use the ${name} custom element.`}
						/>
					</>,
				)
				.body(
					<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
						<Docs name={name} demo={example} />
					</RootLayout>,
				)
				.toResponse();
		}
	})
	.get("/docs/:name/", ({ url, params }) => {
		// redirect from old docs
		const { name } = params;

		if (name === "details" || name === "popover") {
			url.pathname = `/styles/${name}/`;
		} else {
			url.pathname = `/elements/${name}/`;
		}

		url.search = "";

		return Response.redirect(url, 308);
	});

export const handler = app.fetch;
