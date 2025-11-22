import { Config, State } from "@t3m4/types";

export function buildDefaultState(config: Config.Static) {
  const defaultState: State.Static = {};

  for (const [islandKey, island] of Object.entries(config)) {
    defaultState[islandKey] = {};

    if (island.facets) {
      defaultState[islandKey].facets = {};

      for (const [facetKey, facet] of Object.entries(island.facets)) {
        defaultState[islandKey].facets![facetKey] = facet.default;
      }
    }

    if (island.mode) defaultState[islandKey].mode = island.mode.default;
  }

  return defaultState;
}
