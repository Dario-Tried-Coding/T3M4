import * as Schema from "../schema";
import * as IslandNS from "./island";

export type Dynamic<Sc extends Schema.Generic> = {
  [I in keyof Schema.Polished<Sc>]: Dynamic.Island<Sc[I]>;
};
export namespace Dynamic {
  export type Island<Sc extends Schema.Generic.Island> = IslandNS.Dynamic<Sc>;
  export namespace Island {
    export namespace Facets {
      export type Facet<Sc extends Schema.Generic.Island.Facets.Facet> = IslandNS.Dynamic.Facets.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = IslandNS.Dynamic.Facets.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> =
          IslandNS.Dynamic.Facets.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Generic.Island.Facets.Mode> = IslandNS.Dynamic.Facets.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = IslandNS.Dynamic.Facets.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> = IslandNS.Dynamic.Facets.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> =
          IslandNS.Dynamic.Facets.Mode.System<Sc>;
      }
    }
  }
}

export type Static = {
  [island: string]: Static.Island;
};
export namespace Static {
  export type Island = IslandNS.Static;
  export namespace Island {
    export namespace Facets {
      export type Facet = IslandNS.Static.Facets.Facet;
      export namespace Facet {
        export type Mono = IslandNS.Static.Facets.Facet.Mono;
        export type Multi = IslandNS.Static.Facets.Facet.Multi;
      }
    }

    export type Mode = IslandNS.Static.Facets.Mode;
    export namespace Mode {
      export type Mono = IslandNS.Static.Facets.Mode.Mono;
      export type Multi = IslandNS.Static.Facets.Mode.Multi;
      export type System = IslandNS.Static.Facets.Mode.System;
    }
  }
}

export * as Island from "./island";