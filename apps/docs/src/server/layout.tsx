import { Nav } from "@/ui/nav";
import { SkipLink } from "@/ui/skip-link";
import type { JSX } from "ovr";

export const Layout = (props: {
	children?: JSX.Element;
	examples: Array<string | undefined>;
	pages: string[];
	pathname: string;
}) => {
	const { children, examples, pathname, pages } = props;

	return (
		<drab-prefetch class="contents" prerender trigger="a[href^='/']">
			<SkipLink />
			<header class="bg-background/50 sticky top-0 z-10 flex items-center gap-5 px-3 py-2 backdrop-blur-xs lg:hidden">
				<Nav examples={examples} pages={pages} pathname={pathname} dialog />
			</header>

			<main class="lg:flex">
				<div>
					<div class="bg-background sticky top-0 z-10 hidden h-screen min-w-52 overflow-y-auto p-6 lg:block">
						<Nav examples={examples} pages={pages} pathname={pathname} />
					</div>
				</div>
				<div class="w-full justify-center lg:flex">
					<article id="content" class="prose m-6 max-w-[80ch]">
						{children}
						<hr class="my-8" />
					</article>
					<div class="hidden xl:block">
						<on-this-page class="prose sticky top-0 block h-screen min-w-64 overflow-y-auto p-6"></on-this-page>
					</div>
				</div>
			</main>
		</drab-prefetch>
	);
};
