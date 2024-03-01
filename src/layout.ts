import "./package/dialog/define";
import "./package/prefetch/define";

import { inject } from "@vercel/analytics";

// https://developer.chrome.com/docs/web-platform/prerender-pages#impact_on_analytics
const whenActivated = new Promise<void>((resolve) => {
	// @ts-ignore - not supported in all browsers
	if (document.prerendering) {
		// @ts-ignore - not supported in all browsers
		document.addEventListener("prerenderingchange", resolve);
	} else {
		resolve();
	}
});

const initAnalytics = async () => {
	await whenActivated;
	inject({ mode: import.meta.env.DEV ? "development" : "production" });
};

initAnalytics();
