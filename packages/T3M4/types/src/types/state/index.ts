import { Polished, Generic as Schema } from "../schema";
import * as IslandNS from "./island";

export type Dynamic<Sc extends Schema> = {
  [I in keyof Polished<Sc>]: Dynamic.Island<Sc[I]>;
};
export namespace Dynamic {
  export type Island<Sc extends Schema.Island> = IslandNS.Dynamic<Sc>;
  export namespace Island {
    export namespace Facets {
      export type Facet<Sc extends Schema.Island.Facets.Facet> = IslandNS.Dynamic.Facets.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Island.Facets.Facet.Mono> = IslandNS.Dynamic.Facets.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Island.Facets.Facet.Multi> = IslandNS.Dynamic.Facets.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Island.Facets.Mode> = IslandNS.Dynamic.Facets.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Island.Facets.Mode.Mono> = IslandNS.Dynamic.Facets.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Island.Facets.Mode.Multi> = IslandNS.Dynamic.Facets.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Island.Facets.Mode.System> = IslandNS.Dynamic.Facets.Mode.System<Sc>;
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
      export type Mode = IslandNS.Static.Facets.Mode;
    }
  }
}

export * as Island from "./island";
