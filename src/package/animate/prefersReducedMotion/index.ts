/**
 * Checks to see if the user prefers reduced motion
 *
 * @returns `true` if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
	const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	if (mediaQuery.matches) return true;
	return false;
};
