import { Config, Schema } from "@t3m4/types";
import { buildFacets } from "./helpers/build-facets";
import { buildOptions } from "./helpers/build-options";
import { polishSchema } from "./helpers/polish-schema";

export function defineConfig<const Sc extends Schema.Generic>(schema: Sc, config: Config.Dynamic<Sc>) {
  const polishedSchema = polishSchema(schema);

  const islands = Object.keys(polishedSchema);
  const facets = buildFacets(polishedSchema);
  const options = buildOptions(polishedSchema);

  return { islands, facets, options };
}
