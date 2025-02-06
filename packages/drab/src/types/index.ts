type BaseAttributes = {
	trigger: string;
	content: string;
	swap: string;
};

/**
 * Creates a partial of the custom element's type. Makes some attributes required
 * if passed in.
 */
export type Attributes<
	CustomElement,
	Required extends keyof CustomElement = never,
> = Pick<CustomElement, Required> &
	Partial<Omit<CustomElement, Required>> &
	Partial<BaseAttributes>;
