import type { Facets_Schema as Schema } from "../../schema/facets";
import type { Facet_Config } from "./facet";
import type { Mode_Config } from "./mode";

export namespace Facets_Config {
  export namespace Dynamic {
    export type Facet<Sc extends Schema.Generic.Facet> = Facet_Config.Dynamic<Sc>;
    export namespace Facet {
      export type Mono<Sc extends Schema.Generic.Facet.Mono> = Facet_Config.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Facet.Multi> = Facet_Config.Dynamic.Multi<Sc>;
    }

    export type Mode<Sc extends Schema.Generic.Mode> = Mode_Config.Dynamic<Sc>;
    export namespace Mode {
      export type Mono<Sc extends Schema.Generic.Mode.Mono> = Mode_Config.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Mode.Multi> = Mode_Config.Dynamic.Multi<Sc>;
      export type System<Sc extends Schema.Generic.Mode.System> = Mode_Config.Dynamic.System<Sc>;
    }
  }

  export namespace Static {
    export type Facet = Facet_Config.Static;
    export namespace Facet {
      export type Mono = Facet_Config.Static.Mono;
      export type Multi = Facet_Config.Static.Multi;
    }

    export type Mode = Mode_Config.Static;
    export namespace Mode {
      export type Mono = Mode_Config.Static.Mono;
      export type Multi = Mode_Config.Static.Multi;
      export type System = Mode_Config.Static.System;
    }
  }

  export namespace Facet {
    export type Dynamic<Sc extends Schema.Generic.Facet> = Facet_Config.Dynamic<Sc>;
    export namespace Dynamic {
      export type Mono<Sc extends Schema.Generic.Facet.Mono> = Facet_Config.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Facet.Multi> = Facet_Config.Dynamic.Multi<Sc>;
    }

    export type Static = Facet_Config.Static;
    export namespace Static {
      export type Mono = Facet_Config.Static.Mono;
      export type Multi = Facet_Config.Static.Multi;
    }
  }

  export namespace Mode {
    export type Dynamic<Sc extends Schema.Generic.Mode> = Mode_Config.Dynamic<Sc>;
    export namespace Dynamic {
      export type Mono<Sc extends Schema.Generic.Mode.Mono> = Mode_Config.Dynamic.Mono<Sc>;
      export type Multi<Sc extends Schema.Generic.Mode.Multi> = Mode_Config.Dynamic.Multi<Sc>;
      export type System<Sc extends Schema.Generic.Mode.System> = Mode_Config.Dynamic.System<Sc>;
    }

    export type Static = Mode_Config.Static;
    export namespace Static {
      export type Mono = Mode_Config.Static.Mono;
      export type Multi = Mode_Config.Static.Multi;
      export type System = Mode_Config.Static.System;
    }
  }
}
