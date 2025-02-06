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
						class="bg-background backdrop:bg-muted/50 my-0 mr-auto ml-0 h-full max-h-screen w-full max-w-96 -translate-x-full p-6 scheme-dark transition-all transition-discrete duration-500 backdrop:opacity-0 backdrop:backdrop-blur backdrop:transition-all backdrop:transition-discrete backdrop:duration-500 open:translate-x-0 open:backdrop:opacity-100 starting:open:-translate-x-full starting:open:backdrop:opacity-0"
					>
						<div class="mb-4 flex items-center justify-between">
							<HomeLink />
							<button data-trigger class="ghost" aria-label="close">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-5"
								>
									<path
										fill-rule="evenodd"
										d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
										clip-rule="evenodd"
									/>
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
		<>
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
		</>
	);
};

const NavHeading = (props: JSX.IntrinsicElements["h2"]) => {
	const { class: className, children, ...rest } = props;
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
