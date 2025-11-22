import { Facets_Schema as Schema } from "../../schema/facets";

export namespace Facet_State {
  export type Dynamic<Sc extends Schema.Generic.Facet> = Sc extends Schema.Generic.Facet.Mono
    ? Dynamic.Mono<Sc>
    : Sc extends Schema.Generic.Facet.Multi
      ? Dynamic.Multi<Sc>
      : never;
  export namespace Dynamic {
    export type Mono<Sc extends Schema.Generic.Facet.Mono> = Sc;
    export type Multi<Sc extends Schema.Generic.Facet.Multi> = Sc[number];
  }

  export type Static = string;
}
