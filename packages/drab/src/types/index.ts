import type { AnnouncerAttributes } from "../announcer/index.js";
import type { ContextMenuAttributes } from "../contextmenu/index.js";
import type { DialogAttributes } from "../dialog/index.js";
import type { EditorAttributes } from "../editor/index.js";
import type { FullscreenAttributes } from "../fullscreen/index.js";
import type { IntersectAttributes } from "../intersect/index.js";
import type { PrefetchAttributes } from "../prefetch/index.js";
import type { ShareAttributes } from "../share/index.js";
import type { TableSortAttributes } from "../tablesort/index.js";
import type { TabsAttributes } from "../tabs/index.js";
import type { WakeLockAttributes } from "../wakelock/index.js";

export interface Attributes {
	announcer: AnnouncerAttributes;
	contextmenu: ContextMenuAttributes;
	dialog: DialogAttributes;
	editor: EditorAttributes;
	fullscreen: FullscreenAttributes;
	intersect: IntersectAttributes;
	prefetch: PrefetchAttributes;
	share: ShareAttributes;
	tablesort: TableSortAttributes;
	tabs: TabsAttributes;
	wakelock: WakeLockAttributes;
}

type Prefixed<
	Prefix extends string,
	GlobalAttributes,
	ElementAttributes extends Record<string, any>,
> = {
	[K in keyof ElementAttributes as `${Prefix}-${Extract<K, string>}`]: ElementAttributes[K] &
		GlobalAttributes;
};

export type Elements<
	GlobalAttributes,
	Prefix extends string = "drab",
> = Prefixed<Prefix, GlobalAttributes, Attributes>;
