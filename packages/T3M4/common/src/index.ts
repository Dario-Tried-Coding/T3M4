import { Config, Schema } from "@t3m4/types";
import { buildFacets } from "./builders/build-facets";
import { buildOptions } from "./builders/build-options";
import { logValidationResult } from "./helpers/error";
import { validateSchema } from "./validators/schema/validate-schema";
import { validateConfig } from "./validators/config/validate-config";
import { buildStrategies } from "./builders/build-strategies";

export function defineConfig<const Sc extends Schema.Generic>(schema: Sc, config: Config.Dynamic<Sc>) {
  const schemaValidation = validateSchema(schema);
  const configValidation = validateConfig(schemaValidation.value, config);

  if (!schemaValidation.ok) {
    console.warn("[T3M4] Invalid configuration detected:");
    logValidationResult(schemaValidation);
  }

  if (!configValidation.ok) {
    console.warn("[T3M4] Invalid configuration detected:");
    logValidationResult(configValidation);
  }

  const { value: validatedSchema } = schemaValidation;
  const { value: validatedConfig } = configValidation;

  const islands = Object.keys(validatedSchema);
  const strategies = buildStrategies(validatedSchema);
  const facets = buildFacets(validatedSchema);
  const options = buildOptions(validatedSchema);

  return { islands, strategies, facets, options };
}
