import { Facet_Schema as Schema } from "../../schema/facets/facet";

type Base = { store?: boolean };

export namespace Facet_Config {
  export type Dynamic<Sc extends Schema.Generic> = Sc extends Schema.Generic.Mono
    ? Dynamic.Mono<Sc>
    : Sc extends Schema.Generic.Multi
      ? Dynamic.Multi<Sc>
      : never;
  export namespace Dynamic {
    export type Mono<Sc extends Schema.Generic.Mono> = Base & { default: Sc };
    export type Multi<Sc extends Schema.Generic.Multi> = Base & { default: Sc[number] };
  }

  export type Static = Static.Mono | Static.Multi;
  export namespace Static {
    export type Mono = Base & { default: string };
    export type Multi = Base & { default: string };
  }
}
