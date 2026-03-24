import type { Elements } from "drab/types";
import type { JSX } from "ovr";

declare module "ovr" {
	namespace JSX {
		interface IntrinsicElements extends Elements<
			JSX.IntrinsicElements["GLOBAL"]
		> {}
	}
}
