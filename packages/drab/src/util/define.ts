/**
 * Define a custom element to the registry. Checks if the element is
 * defined and then names the element.
 *
 * @param name name of the custom element
 * @param Constructor custom element constructor
 */
export const define = (name: string, Constructor: CustomElementConstructor) => {
	if (!customElements.get(name)) customElements.define(name, Constructor);
};
