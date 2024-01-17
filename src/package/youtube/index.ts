import { Base } from "../base/index.ts";

/**
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

	get iframe() {
		return this.content(HTMLIFrameElement);
	}

	get autoplay() {
		return this.hasAttribute("autoplay");
	}

	set autoplay(v) {
		if (v) this.setAttribute("autoplay", "");
		else this.removeAttribute("autoplay");
	}

	get uid() {
		const uid = this.getAttribute("uid");
		if (!uid) throw new Error("YouTube: missing `uid` attribute.");
		return uid;
	}

	set uid(v) {
		this.setAttribute("uid", v);
	}

	get start() {
		return this.getAttribute("start") ?? "0";
	}

	set start(v) {
		this.setAttribute("start", v);
	}

	get src() {
		return `https://www.youtube-nocookie.com/embed/${this.uid}?start=${this.start}${
			this.autoplay ? "&autoplay=1" : ""
		}`;
	}

	// set src

	connectedCallback() {
		this.iframe.allowFullscreen = true;

		this.iframe.allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

		this.iframe.src = this.src;
	}

	// onAttributeChangedCallback() {}
}
