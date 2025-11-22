import { Config, Islands, Schema } from "@t3m4/types";
import { buildDefaultState } from "./builders/build-default-state";
import { buildFacets } from "./builders/build-facets";
import { buildOptions } from "./builders/build-options";
import { buildStrategies } from "./builders/build-strategies";
import { logValidationResult } from "./helpers/error";
import { validateConfig } from "./validators/config/validate-config";
import { validateSchema } from "./validators/schema/validate-schema";
import { Args_Gen } from "./types";

export function configT3M4<const Sc extends Schema.Suggested>(schema: Sc, config: Config.Dynamic<Sc>): Args_Gen {
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

  const islands: Islands.AsArr = Object.keys(validatedSchema);
  const strategies = buildStrategies(validatedSchema);
  const facets = buildFacets(validatedSchema);
  const options = buildOptions(validatedSchema);
  const defaultState = buildDefaultState(validatedConfig);

  return { islands, strategies, facets, options, defaultState };
}
