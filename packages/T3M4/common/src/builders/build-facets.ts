import { Facets, Schema } from "@t3m4/types";

export function buildFacets(schema: Schema.Generic): Facets.AsObj {
  const facets: Facets.AsObj = {};
  Object.entries(schema).forEach(([i, iSchema]) => {
    if (!iSchema) return;

    const entry: { mode?: boolean; facets?: string[] } = {};

    if ("mode" in iSchema && iSchema.mode !== undefined) entry.mode = true;

    if (iSchema.facets && typeof iSchema.facets === "object") {
      const keys = Object.keys(iSchema.facets);
      if (keys.length) entry.facets = keys;
    }

    facets[i] = entry;
  });
  return facets;
}
