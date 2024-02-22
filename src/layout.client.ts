import "./package/dialog/define";
import "./package/prefetch/define";

import { inject } from "@vercel/analytics";
inject({ mode: import.meta.env.DEV ? "development" : "production" });
