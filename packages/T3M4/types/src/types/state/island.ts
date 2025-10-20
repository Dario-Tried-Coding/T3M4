import * as Schema from "../schema/island";
import * as FacetsNS from "./facets";

export type Island<Sc extends Schema.Generic> = (keyof Schema.Polished<Sc> extends never
  ? {}
  : Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "facets">>
    ? {
        readonly facets: {
          [F in keyof Schema.Polished<Sc>["facets"]]: Island.Facets.Facet<Schema.Polished<Sc>["facets"][F]>;
        };
      }
    : {}) &
  (Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "mode">>
    ? { readonly mode: Island.Facets.Mode<Schema.Polished<Sc>["mode"]> }
    : {});

export namespace Island {
  export namespace Facets {
    export type Facet<Sc extends Schema.Generic.Facets.Facet> = FacetsNS.Facet<Sc>;
    export namespace Facet {
      export type Mono<Sc extends Schema.Generic.Facets.Facet.Mono> = FacetsNS.Facet.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Facets.Facet.Multi> = FacetsNS.Facet.Multi<Sc>;
    }

    export type Mode<Sc extends Schema.Generic.Facets.Mode> = FacetsNS.Mode<Sc>;
    export namespace Mode {
      export type Mono<Sc extends Schema.Generic.Facets.Mode.Mono> = FacetsNS.Mode.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Facets.Mode.Multi> = FacetsNS.Mode.Multi<Sc>;
      export type System<Sc extends Schema.Generic.Facets.Mode.System> = FacetsNS.Mode.System<Sc>;
    }
  }
}
