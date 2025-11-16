import { Config, Schema } from "@t3m4/types";
import { buildFacets } from "./helpers/build-facets";
import { buildOptions } from "./helpers/build-options";
import { logValidationResult } from "./helpers/error";
import { validateSchema } from "./validators/schema/validate-schema";

export function defineConfig<const Sc extends Schema.Generic>(schema: Sc, config: Config.Dynamic<Sc>) {
  const result = validateSchema(schema);

  if (!result.ok) {
    console.warn("[T3M4] Invalid configuration detected:");
    logValidationResult(result);
  }

  const { value: validatedSchema } = result;

  const islands = Object.keys(validatedSchema);
  const facets = buildFacets(validatedSchema);
  const options = buildOptions(validatedSchema);

  return { islands, facets, options };
}
