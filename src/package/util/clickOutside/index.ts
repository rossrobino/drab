export const clickOutside = (
	element: HTMLElement,
	e: MouseEvent,
	callback: () => any,
) => {
	if (e.target instanceof Node && !element.contains(e.target)) {
		callback();
	}
};
