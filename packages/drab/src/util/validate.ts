import type { Constructor } from "../base/index.js";

/**
 * @param actual Element to validate.
 * @param expected Constructor of the expected element.
 * @returns If valid returns `actual` otherwise throws `TypeError`.
 */
export const validate = <T extends HTMLElement>(
	actual: unknown,
	expected: Constructor<T>,
) => {
	if (!(actual instanceof expected))
		throw new TypeError(`${actual} is not an instance of ${expected.name}.`);

	return actual;
};
