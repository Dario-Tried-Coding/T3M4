import { CONSTANTS, Schema } from "@t3m4/types";

type Strategies = {
  [island: string]: {
    mode: CONSTANTS.STRAT | undefined;
    facets: {
      [facet: string]: CONSTANTS.STRAT | undefined;
    };
  };
};

export function buildStrategies(schema: Schema.Generic) {
  return Object.entries(schema).reduce((strategies, [island, islandSchema]) => {
    const islandStrategies = {} as Strategies[string];

    const islandMode = islandSchema.mode;
    if (islandMode)
      islandStrategies.mode = typeof islandMode === "string" ? "mono" : Array.isArray(islandMode) ? "multi" : "system";

    const islandFacets = islandSchema.facets
    if (islandFacets) islandStrategies.facets = Object.entries(islandFacets).reduce((facetStrategies, [facet, facetSchema]) => {
      facetStrategies[facet] = typeof facetSchema === "string" ? "mono" : Array.isArray(facetSchema) ? "multi" : "system"
      return facetStrategies;
    }, {} as Strategies[string]["facets"]);

    strategies[island] = islandStrategies;
    return strategies;
  }, {} as Strategies);
}
