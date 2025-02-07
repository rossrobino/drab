import { Home } from "@/pages";
import { Docs } from "@/pages/docs";
import { GettingStarted } from "@/pages/getting-started";
import { RootLayout } from "@/pages/layout";
import { Injector } from "@robino/html";
import { html } from "client:page";
import type { Handler, Prerender } from "domco";
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

export const handler: Handler = async (req) => {
	const url = new URL(req.url);
	const page = new Injector(html);

	if (url.pathname === "/") {
		page
			.title("drab")
			.head([
				{
					name: "meta",
					attrs: {
						name: "description",
						content: description,
					},
				},
			])
			.body(
				<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
					<Home />
				</RootLayout>,
			);
	} else if (url.pathname === "/getting-started/") {
		page
			.title("drab - Getting Started")
			.head([
				{
					name: "meta",
					attrs: {
						name: "description",
						content: "How to start using drab custom elements.",
					},
				},
			])
			.body(
				<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
					<GettingStarted />
				</RootLayout>,
			);
	} else if (
		url.pathname.startsWith("/elements/") ||
		url.pathname.startsWith("/styles/")
	) {
		const example = examples[`/pages/docs${url.pathname}index.html`];
		const elementName = url.pathname.split("/").at(-2);

		if (example && elementName) {
			page
				.title(`drab - ${elementName}`)
				.head([
					{
						name: "meta",
						attrs: {
							name: "description",
							content: `Learn how to use the ${elementName} custom element.`,
						},
					},
				])
				.body(
					<RootLayout examples={exampleSubPaths} pathname={url.pathname}>
						<Docs name={elementName} demo={example} />
					</RootLayout>,
				);
		}
	}

	if (!page.empty) return page.toResponse();

	// append trailing slash
	if (url.pathname.at(-1) !== "/") {
		url.pathname += "/";
		url.search = "";
		return Response.redirect(url.origin, 301);
	}

	// redirect from old docs
	if (url.pathname.startsWith("/docs/")) {
		const element = url.pathname.split("/").at(2);

		if (element) {
			if (element === "details" || element === "popover") {
				url.pathname = `/styles/${element}/`;
			} else {
				url.pathname = `/elements/${element}`;
			}

			url.search = "";

			return Response.redirect(url, 301);
		}
	}

	return notFound(url.pathname);
};

const notFound = async (pathname: string) => {
	return new Injector(html)
		.title("drab - Not Found")
		.body(
			<RootLayout examples={exampleSubPaths} pathname={pathname}>
				<h1>Not found</h1>
			</RootLayout>,
		)
		.toResponse();
};
