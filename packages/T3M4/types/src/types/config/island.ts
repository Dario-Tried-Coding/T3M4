import type { Island_Schema as Schema } from "../schema/island";
import type { Facets_Config } from "./facets";

export namespace Island_Config {
  export type Dynamic<Sc extends Schema.Generic> = (Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "facets">>
    ? {
        facets: {
          -readonly [F in keyof Sc["facets"]]: Dynamic.Facets.Facet<Schema.Polished<Sc>["facets"][F]>;
        };
      }
    : {}) &
    (Schema.Polished<Sc> extends Required<Pick<Schema.Generic, "mode">>
      ? {
          mode: Dynamic.Facets.Mode<Schema.Polished<Sc>["mode"]>;
        }
      : {});
  export namespace Dynamic {
    export namespace Facets {
      export type Facet<Sc extends Schema.Generic.Facets.Facet> = Facets_Config.Dynamic.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Generic.Facets.Facet.Mono> = Facets_Config.Dynamic.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Facet.Multi> = Facets_Config.Dynamic.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Generic.Facets.Mode> = Facets_Config.Dynamic.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Generic.Facets.Mode.Mono> = Facets_Config.Dynamic.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Mode.Multi> = Facets_Config.Dynamic.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Facets.Mode.System> = Facets_Config.Dynamic.Mode.System<Sc>;
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
      export type Facet = Facets_Config.Static.Facet;
      export namespace Facet {
        export type Mono = Facets_Config.Static.Facet.Mono;
        export type Multi = Facets_Config.Static.Facet.Multi;
      }

      export type Mode = Facets_Config.Static.Mode;
      export namespace Mode {
        export type Mono = Facets_Config.Static.Mode.Mono;
        export type Multi = Facets_Config.Static.Mode.Multi;
        export type System = Facets_Config.Static.Mode.System;
      }
    }
  }

  export namespace Facets {
    export namespace Dynamic {
      export type Facet<Sc extends Schema.Generic.Facets.Facet> = Facets_Config.Dynamic.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Generic.Facets.Facet.Mono> = Facets_Config.Dynamic.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Facet.Multi> = Facets_Config.Dynamic.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Generic.Facets.Mode> = Facets_Config.Dynamic.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Generic.Facets.Mode.Mono> = Facets_Config.Dynamic.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Mode.Multi> = Facets_Config.Dynamic.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Facets.Mode.System> = Facets_Config.Dynamic.Mode.System<Sc>;
      }
    }

    export namespace Static {
      export type Facet = Facets_Config.Static.Facet;
      export namespace Facet {
        export type Mono = Facets_Config.Static.Facet.Mono;
        export type Multi = Facets_Config.Static.Facet.Multi;
      }

      export type Mode = Facets_Config.Static.Mode;
      export namespace Mode {
        export type Mono = Facets_Config.Static.Mode.Mono;
        export type Multi = Facets_Config.Static.Mode.Multi;
        export type System = Facets_Config.Static.Mode.System;
      }
    }

    export namespace Facet {
      export type Dynamic<Sc extends Schema.Generic.Facets.Facet> = Facets_Config.Facet.Dynamic<Sc>;
      export namespace Dynamic {
        export type Mono<Sc extends Schema.Generic.Facets.Facet.Mono> = Facets_Config.Facet.Dynamic.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Facet.Multi> = Facets_Config.Facet.Dynamic.Multi<Sc>;
      }

      export type Static = Facets_Config.Facet.Static;
      export namespace Static {
        export type Mono = Facets_Config.Facet.Static.Mono;
        export type Multi = Facets_Config.Facet.Static.Multi;
      }
    }

    export namespace Mode {
      export type Dynamic<Sc extends Schema.Generic.Facets.Mode> = Facets_Config.Mode.Dynamic<Sc>;
      export namespace Dynamic {
        export type Mono<Sc extends Schema.Generic.Facets.Mode.Mono> = Facets_Config.Mode.Dynamic.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Facets.Mode.Multi> = Facets_Config.Mode.Dynamic.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Facets.Mode.System> = Facets_Config.Mode.Dynamic.System<Sc>;
      }

      export type Static = Facets_Config.Mode.Static;
      export namespace Static {
        export type Mono = Facets_Config.Mode.Static.Mono;
        export type Multi = Facets_Config.Mode.Static.Multi;
        export type System = Facets_Config.Mode.Static.System;
      }
    }
  }
}
