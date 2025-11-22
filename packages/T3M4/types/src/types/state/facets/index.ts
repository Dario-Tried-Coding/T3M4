import { Facets_Schema as Schema } from "../../schema/facets";
import { Facet_State as FacetNS } from "./facet";
import { Mode_State as ModeNS } from "./mode";

export namespace Facets_Mode {
  export namespace Dynamic {
    export type Facet<Sc extends Schema.Generic.Facet> = FacetNS.Dynamic<Sc>;
    export namespace Facet {
      export type Mono<Sc extends Schema.Generic.Facet.Mono> = FacetNS.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Facet.Multi> = FacetNS.Dynamic.Multi<Sc>;
    }
  
    export type Mode<Sc extends Schema.Generic.Mode> = ModeNS.Dynamic<Sc>;
    export namespace Mode {
      export type Mono<Sc extends Schema.Generic.Mode.Mono> = ModeNS.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Mode.Multi> = ModeNS.Dynamic.Multi<Sc>;
      export type System<Sc extends Schema.Generic.Mode.System> = ModeNS.Dynamic.System<Sc>;
    }
  }
  
  export namespace Static {
    export type Facet = FacetNS.Static;
    export type Mode = ModeNS.Static;
  }
}

