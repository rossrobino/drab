export interface Info {
	packageName: string;
	gitHub: string;
	projectHomepage: string;
	author: string;
	authorHomepage?: string;
	license?: string;
}

interface Prop {
	name: string;
	purpose: string;
	type: string;
	default: unknown;
}

interface Slot {
	name: string;
	purpose: string;
	default: unknown;
}

interface Reference {
	name: string;
	href: string;
}

export interface Component {
	name: string;
	purpose: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: any;
	example: { [propName: string]: unknown };
	props?: Prop[];
	slots?: Slot[];
	references?: Reference[];
}