import { Island_Schema as Schema } from "../schema/island";
import { Facets_Mode as FacetsNS } from "./facets";

export namespace Island_State {
  export type Dynamic<Sc extends Schema.Generic> = (keyof Schema.Polished<Sc> extends never
    ? {}
    : Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "facets">>
      ? {
          facets: {
            -readonly [F in keyof Schema.Polished<Sc>["facets"]]: Dynamic.Facets.Facet<
              Schema.Polished<Sc>["facets"][F]
            >;
          };
        }
      : {}) &
    (Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "mode">>
      ? { mode: Dynamic.Facets.Mode<Schema.Polished<Sc>["mode"]> }
      : {});
  export namespace Dynamic {
    export namespace Facets {
      export type Facet<Sc extends Schema.Generic.Facets.Facet> = FacetsNS.Dynamic.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Generic.Facets.Facet.Mono> = FacetsNS.Dynamic.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Facet.Multi> = FacetsNS.Dynamic.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Generic.Facets.Mode> = FacetsNS.Dynamic.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Generic.Facets.Mode.Mono> = FacetsNS.Dynamic.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Mode.Multi> = FacetsNS.Dynamic.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Facets.Mode.System> = FacetsNS.Dynamic.Mode.System<Sc>;
      }
    }
  }

  export type Static = {
    facets?: {
      [facet: string]: Static.Facets.Facet;
    };
    mode?: Static.Facets.Mode;
  };
  export namespace Static {
    export namespace Facets {
      export type Facet = FacetsNS.Static.Facet;
      export type Mode = FacetsNS.Static.Mode;
    }
  }
}
