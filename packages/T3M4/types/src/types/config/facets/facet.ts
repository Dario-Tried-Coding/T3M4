import { STRATS } from "../../constants";
import { Facet_Schema as Schema } from "../../schema/facets/facet";

type Base = { store?: boolean };

export namespace Facet_Config {
  export type Dynamic<Sc extends Schema.Generic> = Sc extends Schema.Generic.Mono
    ? Dynamic.Mono<Sc>
    : Sc extends Schema.Generic.Multi
      ? Dynamic.Multi<Sc>
      : never;
  export namespace Dynamic {
    export type Mono<Sc extends Schema.Generic.Mono> = Base & { strategy: STRATS["mono"]; default: Sc };
    export type Multi<Sc extends Schema.Generic.Multi> = Base & { strategy: STRATS["multi"]; default: Sc[number] };
  }

  export type Static = Static.Mono | Static.Multi;
  export namespace Static {
    export type Mono = Base & { strategy: STRATS["mono"]; default: string };
    export type Multi = Base & { strategy: STRATS["multi"]; default: string[] };
  }
}
