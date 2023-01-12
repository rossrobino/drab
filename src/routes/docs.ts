import ShareButton from "$lib/svelte/ShareButton.svelte";
import YouTube from "$lib/svelte/YouTube.svelte";

interface Info {
	packageName: string;
	gitHub: string;
	projectHomepage: string;
	author: string;
	authorHomepage: string;
	license: string;
}

export const info: Info = {
	packageName: "@rossrobino/components",
	gitHub: "https://github.com/rossrobino/components",
	projectHomepage: "https://components.robino.dev",
	author: "Ross Robino",
	authorHomepage: "https://robino.dev",
	license: "MIT",
};

interface Prop {
	name: string;
	purpose: string;
	type: string;
	default: any;
}

interface Slot {
	name: string;
	purpose: string;
	default: any;
}

interface Reference {
	name: string;
	href: string;
}

interface Component {
	name: string;
	purpose: string;
	component: any;
	example: object;
	props: Prop[];
	slots: Slot[];
	references: Reference[];
}
export const componentList: Component[] = [
	{
		component: ShareButton,
		name: "ShareButton",
		purpose:
			"Uses the navigator api to share or copy a url link depending on browser support.",
		props: [
			{ name: "class", purpose: "class", type: "string", default: "" },
			{ name: "id", purpose: "id", type: "string", default: "" },
			{
				name: "url",
				purpose: "Link to share",
				type: "string",
				default: "",
			},
			{
				name: "title",
				purpose: "title",
				type: "string",
				default: "end of url",
			},
			{
				name: "text",
				purpose: "Additional text in share message",
				type: "string",
				default: "",
			},
		],
		example: {
			url: `${info.projectHomepage}`,
			title: "@rossrobino/components",
			text: "Check out this page: ",
			class: "px-4 py-2 bg-zinc-300 dark:bg-zinc-700",
		},
		references: [
			{
				name: "Blog Post",
				href: "https://blog.robino.dev/posts/navigator-share-svelte",
			},
		],
		slots: [
			{ name: "default", purpose: "default", default: "Share" },
			{
				name: "complete",
				purpose: "displays after copy is complete",
				default: "Copied",
			},
		],
	},
	{
		component: YouTube,
		name: "YouTube",
		purpose: "Embed a YouTube video into a website with the video uid.",
		props: [
			{ name: "class", purpose: "class", type: "string", default: "" },
			{ name: "id", purpose: "id", type: "string", default: "" },
			{
				name: "uid",
				purpose: "Unique id found in url of the YouTube video",
				type: "string",
				default: "",
			},
			{
				name: "title",
				purpose: "iframe title",
				type: "string",
				default: "",
			},
		],
		example: {
			uid: "gouiY85kD2o",
			title: "Renegade - Kevin Olusola",
			class: "w-full aspect-video border-4 border-zinc-500",
		},
		references: [],
		slots: [],
	},
];
