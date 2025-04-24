import { HomeLink } from "@/ui/home-link";
import type { JSX } from "ovr";

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
						class="ghost icon"
						aria-label="open navigation dialog"
					>
						<span class="icon-[lucide--align-justify]"></span>
					</button>
					<dialog
						data-content
						class="bg-background backdrop:bg-muted/50 my-0 mr-auto ml-0 h-full max-h-screen w-full max-w-96 p-6 backdrop:opacity-0 backdrop:backdrop-blur backdrop:transition-opacity open:backdrop:opacity-100"
					>
						<div class="mb-4 flex items-center justify-between">
							<HomeLink />
							<button data-trigger class="ghost icon" aria-label="close">
								<span class="icon-[lucide--x]"></span>
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
			<div class="mb-2">
				<HomeLink />
			</div>
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
		<div class="flex flex-col gap-4">
			<div>
				<ul class="mt-2">
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
					<span class="icon-[lucide--github]"></span>
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
