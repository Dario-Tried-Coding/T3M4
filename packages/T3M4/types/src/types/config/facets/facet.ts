import { STRATS } from "../../constants";
import { Generic as Schema } from "../../schema/facets/facet";

type Base = { store?: boolean };

export type Dynamic<Sc extends Schema> = Sc extends Schema.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Multi
    ? Dynamic.Multi<Sc>
    : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Mono> = Base & { strategy: STRATS["mono"]; default: Sc };
  export type Multi<Sc extends Schema.Multi> = Base & { strategy: STRATS["multi"]; default: Sc[number] };
}

export type Static = Static.Mono | Static.Multi;
export namespace Static {
  export type Mono = Base & { strategy: STRATS["mono"]; default: string };
  export type Multi = Base & { strategy: STRATS["multi"]; default: string[] };
}
