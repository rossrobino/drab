// References:
// Tan Li Hau - https://lihautan.com/
// https://svelte.dev/repl/8031c800d7e34fd692dd18174b514e4e?version=3.50.1
// https://svelte.dev/tutorial/actions

/**
 * @param {*} element 
 * @param {function} callbackFunction
 * @returns {object}
 */
export function clickOutside(element, callbackFunction) {

	/** @param {*} event */
	function onClick(event) {
		if (!element.contains(event.target)) {
			callbackFunction();
		}
	}

	document.body.addEventListener("click", onClick);

	return {
		/** @param {function} newCallbackFunction */
		update(newCallbackFunction) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener("click", onClick);
		},
	};
}
