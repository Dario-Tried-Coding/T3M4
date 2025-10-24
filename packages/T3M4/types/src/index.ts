import { Schema } from "./types";

const test = {
  island0: { facets: {}, mode: [] },
  island1: {},
  island2: { facets: {} },
  island3: { mode: "default" },
  island4: { mode: [] },
  island5: { mode: ["lighttt", "darkkk"] },
  island5_1: { mode: { light: "lightttt", dark: "darkkkk" } },
  island5_2: { mode: { light: "lightttt", dark: "darkkkk", system: "systemmmm" } },
  island5_3: { mode: { light: "lightttt", dark: "darkkkk", system: "systemmmm", custom: [] } },
  island5_4: { mode: { light: "lightttt", dark: "darkkkk", system: "systemmmm", custom: ["custom1", "custom2"] } },
  island5_5: { mode: { light: "lightttt", dark: "darkkkk", custom: ["custom1", "custom2"] } },
  island5_6: { mode: { light: "lightttt", dark: "darkkkk", custom: [] } },
  island6: { facets: {}, mode: "defaultttt" },
  island7: { facets: {}, mode: ["defaultttt", "lighttt", "darkkk"] },
  island8: { facets: { facet1: "defaultttt" } },
  island9: { facets: { facet1: [] } },
  island9_1: { facets: { facet1: [] }, mode: [] },
  island10: { facets: { facet1: ["custom1", "custom2"] } },
  island11: { facets: { facet1: ["custom1", "custom2"] }, mode: "defaultttt" },
} as const satisfies Schema.Suggested;
