import { Base } from "../base/index.ts";

/**
 * # YouTube
 *
 * Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.
 *
 * ## Attributes
 *
 * - `autoplay` - auto-plays the video
 * - `start` - start time (seconds)
 * - `uid` - unique YouTube id found in the url
 */
export class YouTube extends Base {
	constructor() {
		super();
	}

	connectedCallback() {
		const uid = this.getAttribute("uid");
		const autoplay = this.getAttribute("autoplay");
		const start = this.getAttribute("start");

		if (this.content instanceof HTMLIFrameElement) {
			if (!uid) {
				console.error("YouTube: missing `uid` attribute.");
			}
			this.content.allowFullscreen = true;
			this.content.allow =
				"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
			this.content.src = `https://www.youtube-nocookie.com/embed/${uid}?start=${start}${
				typeof autoplay === "string" && autoplay !== "false"
					? "&autoplay=1"
					: ""
			}`;
		} else {
			console.error("YouTube: iframe not found.");
		}
	}
}
