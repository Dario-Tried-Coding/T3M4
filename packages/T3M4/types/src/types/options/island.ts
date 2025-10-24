import { Generic as Schema } from "../schema/island";
import * as FacetsNS from "./facets";

export type Dynamic<Sc extends Schema> = (Sc extends Required<Pick<Schema, "facets">>
  ? {
      facets: {
        -readonly [F in keyof Sc["facets"]]: Dynamic.Facets.Facet<Sc["facets"][F]>;
      };
    }
  : {}) &
  (Sc extends Required<Pick<Schema, "mode">> ? { mode: Dynamic.Facets.Mode<Sc["mode"]> } : {});
export namespace Dynamic {
  export namespace Facets {
    export type Facet<Sc extends Schema.Facets.Facet> = FacetsNS.Dynamic.Facet<Sc>;
    export namespace Facet {
      export type Mono<Sc extends Schema.Facets.Facet.Mono> = FacetsNS.Dynamic.Facet.Mono<Sc>;
      export type Multi<Sc extends Schema.Facets.Facet.Multi> = FacetsNS.Dynamic.Facet.Multi<Sc>;
    }

    export type Mode<Sc extends Schema.Facets.Mode> = FacetsNS.Dynamic.Mode<Sc>;
    export namespace Mode {
      export type Mono<Sc extends Schema.Facets.Mode.Mono> = FacetsNS.Dynamic.Mode.Mono<Sc>;
      export type Multi<Sc extends Schema.Facets.Mode.Multi> = FacetsNS.Dynamic.Mode.Multi<Sc>;
      export type System<Sc extends Schema.Facets.Mode.System> = FacetsNS.Dynamic.Mode.System<Sc>;
    }
  }
}

export * as Facets from "./facets";
