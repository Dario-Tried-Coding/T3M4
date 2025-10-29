import type { Schema } from "../schema";
import type { Island_Config } from "./island";

export namespace Config {
  export type Dynamic<Sc extends Schema.Generic> = {
    [I in keyof Schema.Polished<Sc>]: Dynamic.Island<Sc[I]>;
  };
  export namespace Dynamic {
    export type Island<Sc extends Schema.Generic.Island> = Island_Config.Dynamic<Sc>;
    export namespace Island {
      export namespace Facets {
        export type Facet<Sc extends Schema.Generic.Island.Facets.Facet> = Island_Config.Dynamic.Facets.Facet<Sc>;
        export namespace Facet {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = Island_Config.Dynamic.Facets.Facet.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> =
            Island_Config.Dynamic.Facets.Facet.Multi<Sc>;
        }

        export type Mode<Sc extends Schema.Generic.Island.Facets.Mode> = Island_Config.Dynamic.Facets.Mode<Sc>;
        export namespace Mode {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = Island_Config.Dynamic.Facets.Mode.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> =
            Island_Config.Dynamic.Facets.Mode.Multi<Sc>;
          export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> =
            Island_Config.Dynamic.Facets.Mode.System<Sc>;
        }
      }
    }
  }

  export type Static = {
    [island: string]: Static.Island;
  };
  export namespace Static {
    export type Island = Island_Config.Static;
    export namespace Island {
      export namespace Facets {
        export type Facet = Island_Config.Static.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Config.Static.Facets.Facet.Mono;
          export type Multi = Island_Config.Static.Facets.Facet.Multi;
        }
      }

      export type Mode = Island_Config.Static.Facets.Mode;
      export namespace Mode {
        export type Mono = Island_Config.Static.Facets.Mode.Mono;
        export type Multi = Island_Config.Static.Facets.Mode.Multi;
        export type System = Island_Config.Static.Facets.Mode.System;
      }
    }
  }

  export namespace Island {
    export type Dynamic<Sc extends Schema.Generic.Island> = Island_Config.Dynamic<Sc>;
    export namespace Dynamic {
      export namespace Facets {
        export type Facet<Sc extends Schema.Generic.Island.Facets.Facet> = Island_Config.Dynamic.Facets.Facet<Sc>;
        export namespace Facet {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = Island_Config.Dynamic.Facets.Facet.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> =
            Island_Config.Dynamic.Facets.Facet.Multi<Sc>;
        }

        export type Mode<Sc extends Schema.Generic.Island.Facets.Mode> = Island_Config.Dynamic.Facets.Mode<Sc>;
        export namespace Mode {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = Island_Config.Dynamic.Facets.Mode.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> =
            Island_Config.Dynamic.Facets.Mode.Multi<Sc>;
          export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> =
            Island_Config.Dynamic.Facets.Mode.System<Sc>;
        }
      }
    }

    export type Static = Island_Config.Static;
    export namespace Static {
      export namespace Facets {
        export type Facet = Island_Config.Static.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Config.Static.Facets.Facet.Mono;
          export type Multi = Island_Config.Static.Facets.Facet.Multi;
        }

        export type Mode = Island_Config.Static.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Config.Static.Facets.Mode.Mono;
          export type Multi = Island_Config.Static.Facets.Mode.Multi;
          export type System = Island_Config.Static.Facets.Mode.System;
        }
      }
    }

    export namespace Facets {
      export namespace Dynamic {
        export type Facet<Sc extends Schema.Generic.Island.Facets.Facet> = Island_Config.Dynamic.Facets.Facet<Sc>;
        export namespace Facet {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = Island_Config.Dynamic.Facets.Facet.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> =
            Island_Config.Dynamic.Facets.Facet.Multi<Sc>;
        }

        export type Mode<Sc extends Schema.Generic.Island.Facets.Mode> = Island_Config.Dynamic.Facets.Mode<Sc>;
        export namespace Mode {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = Island_Config.Dynamic.Facets.Mode.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> =
            Island_Config.Dynamic.Facets.Mode.Multi<Sc>;
          export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> =
            Island_Config.Dynamic.Facets.Mode.System<Sc>;
        }
      }

      export namespace Static {
        export type Facet = Island_Config.Static.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Config.Static.Facets.Facet.Mono;
          export type Multi = Island_Config.Static.Facets.Facet.Multi;
        }

        export type Mode = Island_Config.Static.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Config.Static.Facets.Mode.Mono;
          export type Multi = Island_Config.Static.Facets.Mode.Multi;
          export type System = Island_Config.Static.Facets.Mode.System;
        }
      }

      export namespace Facet {
        export type Dynamic<Sc extends Schema.Generic.Island.Facets.Facet> = Island_Config.Facets.Facet.Dynamic<Sc>;
        export namespace Dynamic {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = Island_Config.Facets.Facet.Dynamic.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> =
            Island_Config.Facets.Facet.Dynamic.Multi<Sc>;
        }

        export type Static = Island_Config.Facets.Facet.Static;
        export namespace Static {
          export type Mono = Island_Config.Facets.Facet.Static.Mono;
          export type Multi = Island_Config.Facets.Facet.Static.Multi;
        }
      }

      export namespace Mode {
        export type Dynamic<Sc extends Schema.Generic.Island.Facets.Mode> = Island_Config.Facets.Mode.Dynamic<Sc>;
        export namespace Dynamic {
          export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = Island_Config.Facets.Mode.Dynamic.Mono<Sc>;
          export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> =
            Island_Config.Facets.Mode.Dynamic.Multi<Sc>;
          export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> =
            Island_Config.Facets.Mode.Dynamic.System<Sc>;
        }

        export type Static = Island_Config.Facets.Mode.Static;
        export namespace Static {
          export type Mono = Island_Config.Facets.Mode.Static.Mono;
          export type Multi = Island_Config.Facets.Mode.Static.Multi;
          export type System = Island_Config.Facets.Mode.Static.System;
        }
      }
    }
  }
}
