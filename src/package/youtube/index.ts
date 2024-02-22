import { Base } from "../base/index.js";
import type { Attributes } from "../types/index.js";

export type YouTubeAttributes = Attributes<YouTube, "uid">;

/**
 * Embeds a YouTube video iframe into a website with the video uid, using www.youtube-nocookie.com.
 */
export class YouTube extends Base {
	static observedAttributes = ["autoplay", "start", "uid"] as const;

	constructor() {
		super();
	}

	/** The `HTMLIFrameElement` within the element. */
	get iframe() {
		return this.getContent(HTMLIFrameElement);
	}

	/** Whether the video should start playing when loaded. */
	get autoplay() {
		return this.hasAttribute("autoplay");
	}

	set autoplay(value) {
		if (value) this.setAttribute("autoplay", "");
		else this.removeAttribute("autoplay");
	}

	/** The start time of the video (seconds). */
	get start() {
		return this.getAttribute("start") ?? "0";
	}

	set start(value) {
		this.setAttribute("start", value);
	}

	/**
	 * The video's YouTube uid, found within the url of the video.
	 *
	 * For example if the video url is https://youtu.be/gouiY85kD2o,
	 * the `uid` is `"gouiY85kD2o"`.
	 */
	get uid() {
		const uid = this.getAttribute("uid");
		if (!uid) throw new Error("YouTube: missing `uid` attribute.");
		return uid;
	}

	set uid(v) {
		this.setAttribute("uid", v);
	}

	mount() {
		this.iframe.allowFullscreen = true;
		this.iframe.allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
	}

	attributeChangedCallback() {
		// BREAKING TODO: make consistent with other components - decide on observed attributes

		queueMicrotask(() => {
			this.iframe.src = `https://www.youtube-nocookie.com/embed/${this.uid}?start=${this.start}${
				this.autoplay ? "&autoplay=1" : ""
			}`;
		});
	}
}
