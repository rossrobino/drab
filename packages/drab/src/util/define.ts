/**
 * Define a custom element to the registry. Checks if the element is
 * defined and then names the element `drab-${Constructor.name.toLowercase()}`.
 *
 * @param Constructor custom element constructor
 */
export const define = (Constructor: CustomElementConstructor) => {
	const name = `drab-${Constructor.name.toLowerCase()}`;
	if (!customElements.get(name)) customElements.define(name, Constructor);
};
