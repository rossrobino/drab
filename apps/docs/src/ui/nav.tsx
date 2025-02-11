import { HomeLink } from "./home-link";
import type { JSX } from "@robino/jsx";

export const Nav = (props: {
	examples: Array<string | undefined>;
	dialog?: boolean;
	pathname: string;
}) => {
	const { examples, dialog, pathname } = props;

	const elements: string[] = [];
	const styles: string[] = [];

	for (const example of examples) {
		const [, type, name] = example?.split("/") ?? [];

		if (!type || !name)
			throw new Error(`element type: ${type}, name: ${name} not found.`);

		if (type === "elements") {
			elements.push(name);
		} else if (type === "styles") {
			styles.push(name);
		}
	}

	if (dialog) {
		return (
			<nav>
				<drab-dialog class="contents" click-outside-close remove-body-scroll>
					<button
						data-trigger
						type="button"
						class="ghost"
						aria-label="open navigation dialog"
					>
						{/* bars-3 */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="size-5"
						>
							<path
								fill-rule="evenodd"
								d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<dialog
						data-content
						class="bg-background backdrop:bg-muted/50 my-0 mr-auto ml-0 h-full max-h-screen w-full max-w-96 p-6 scheme-dark backdrop:opacity-0 backdrop:backdrop-blur backdrop:transition-opacity open:backdrop:opacity-100"
					>
						<div class="mb-4 flex items-center justify-between">
							<HomeLink />
							<button data-trigger class="ghost" aria-label="close">
								{/* x-mark */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="size-5"
								>
									<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
								</svg>
							</button>
						</div>
						<NavLinks elements={elements} styles={styles} pathname={pathname} />
					</dialog>
				</drab-dialog>
			</nav>
		);
	}

	return (
		<nav>
			<HomeLink />
			<NavLinks elements={elements} styles={styles} pathname={pathname} />
		</nav>
	);
};

export const NavLinks = (props: {
	elements: string[];
	styles: string[];
	pathname: string;
}) => {
	const { elements, styles, pathname } = props;

	return (
		<div class="flex h-[94%] flex-col gap-4">
			<div>
				<ul class="mt-2">
					<li>
						<NavLink href="/" pathname={pathname}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink href="/getting-started/" pathname={pathname}>
							Getting started
						</NavLink>
					</li>
				</ul>
				<NavHeading>Elements</NavHeading>
				<ul>
					{elements.map((element) => {
						return (
							<li>
								<NavLink href={`/elements/${element}/`} pathname={pathname}>
									{element}
								</NavLink>
							</li>
						);
					})}
				</ul>

				<NavHeading>Styles</NavHeading>
				<ul>
					{styles.map((element) => {
						return (
							<li>
								<NavLink href={`/styles/${element}/`} pathname={pathname}>
									{element}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>

			<div class="flex gap-1">
				<a
					href="https://github.com/rossrobino/drab"
					aria-label="GitHub repository"
					class="button icon ghost"
				>
					{/* github */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-github"
					>
						<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
				</a>
				<a
					href="https://www.npmjs.com/package/drab"
					aria-label="NPM package"
					class="button icon ghost"
				>
					{/* npm */}
					<svg
						class="size-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"></path>
					</svg>
				</a>
			</div>
		</div>
	);
};

const NavHeading = (props: JSX.IntrinsicElements["h2"]) => {
	const { class: className = "", children, ...rest } = props;
	return (
		<h2 class={`${className} mt-4 mb-2 text-lg`} {...rest}>
			{children}
		</h2>
	);
};
const NavLink = (props: JSX.IntrinsicElements["a"] & { pathname: string }) => {
	const { class: className, children, pathname, href, ...rest } = props;

	return (
		<a
			href={href}
			class={`${className} ${pathname === href ? "secondary" : "ghost"} button my-1 justify-start`}
			{...rest}
		>
			{children}
		</a>
	);
};
