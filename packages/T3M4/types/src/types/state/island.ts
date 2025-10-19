import { Generic as Schema } from "../schema/island";
import * as FacetsNS from "./facets";

export type Island<Sc extends Schema> = (Sc extends Required<Pick<Schema, "facets">>
  ? {
      facets: {
        [F in keyof Sc["facets"]]: Island.Facets.Facet<Sc["facets"][F]>;
      };
    }
  : {}) &
  (Sc extends Required<Pick<Schema, "mode">> ? { mode: Island.Facets.Mode<Sc["mode"]> } : {});
export namespace Island {
  export namespace Facets {
    export type Facet<Sc extends Schema.Facets.Facet> = FacetsNS.Facet<Sc>;
    export namespace Facet {
      export type Mono<Sc extends Schema.Facets.Facet.Mono> = FacetsNS.Facet.Mono<Sc>;
      export type Multi<Sc extends Schema.Facets.Facet.Multi> = FacetsNS.Facet.Multi<Sc>;
    }

    export type Mode<Sc extends Schema.Facets.Mode> = FacetsNS.Mode<Sc>;
    export namespace Mode {
      export type Mono<Sc extends Schema.Facets.Mode.Mono> = FacetsNS.Mode.Mono<Sc>;
      export type Multi<Sc extends Schema.Facets.Mode.Multi> = FacetsNS.Mode.Multi<Sc>;
      export type System<Sc extends Schema.Facets.Mode.System> = FacetsNS.Mode.System<Sc>;
    }
  }
}