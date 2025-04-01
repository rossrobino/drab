import { Home } from "@/pages";
import { Docs } from "@/pages/docs";
import { GettingStarted } from "@/pages/getting-started";
import { RootLayout } from "@/pages/layout";
import { html } from "client:page";
import { description } from "drab/package.json";
import { Router } from "ovr";

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

const app = new Router({
	trailingSlash: "always",
	start(c) {
		c.base = html;
		c.notFound = (c) => {
			c.head(<title>drab - Not Found</title>);
			c.page(
				<RootLayout examples={exampleSubPaths} pathname={c.url.pathname}>
					<h1>Not found</h1>
				</RootLayout>,
			);
		};
	},
})
	.get("/", (c) => {
		c.head(
			<>
				<title>drab</title>
				<meta name="description" content={description} />
			</>,
		);

		c.page(
			<RootLayout examples={exampleSubPaths} pathname={c.url.pathname}>
				<Home />
			</RootLayout>,
		);
	})
	.get("/getting-started/", (c) => {
		c.head(
			<>
				<title>drab - Getting Started</title>
				<meta
					name="description"
					content="How to start using drab custom elements."
				/>
			</>,
		);

		c.page(
			<RootLayout examples={exampleSubPaths} pathname={c.url.pathname}>
				<GettingStarted />
			</RootLayout>,
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

			c.page(
				<RootLayout examples={exampleSubPaths} pathname={c.url.pathname}>
					<Docs name={name} demo={example} />
				</RootLayout>,
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
	});

app.prerender = ["/", "/getting-started/", ...exampleSubPaths];

export default app;
