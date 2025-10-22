import { Generic as Schema } from "../../schema/facets"
import * as FacetNS from "./facet"
import * as ModeNS from "./mode"

export namespace Dynamic {
  export type Facet<Sc extends Schema.Facet> = FacetNS.Dynamic<Sc>
  export namespace Facet {
    export type Mono<Sc extends Schema.Facet.Mono> = FacetNS.Dynamic.Mono<Sc>
    export type Multi<Sc extends Schema.Facet.Multi> = FacetNS.Dynamic.Multi<Sc>
  }

  export type Mode<Sc extends Schema.Mode> = ModeNS.Dynamic<Sc>
  export namespace Mode {
    export type Mono<Sc extends Schema.Mode.Mono> = ModeNS.Dynamic.Mono<Sc>
    export type Multi<Sc extends Schema.Mode.Multi> = ModeNS.Dynamic.Multi<Sc>
    export type System<Sc extends Schema.Mode.System> = ModeNS.Dynamic.System<Sc>
  }
}

export namespace Static {
  export type Facet = FacetNS.Static
  export namespace Facet {
    export type Mono = FacetNS.Static.Mono
    export type Multi = FacetNS.Static.Multi
  }

  export type Mode = ModeNS.Static
  export namespace Mode {
    export type Mono = ModeNS.Static.Mono
    export type Multi = ModeNS.Static.Multi
    export type System = ModeNS.Static.System
  }
}

export * as Facet from "./facet"
export * as Mode from "./mode"