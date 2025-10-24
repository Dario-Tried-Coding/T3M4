import { Generic as Schema } from "../../schema/facets";

export type Dynamic<Sc extends Schema.Facet> = Sc extends Schema.Facet.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Facet.Multi
    ? Dynamic.Multi<Sc>
    : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Facet.Mono> = Sc;
  export type Multi<Sc extends Schema.Facet.Multi> = Sc[number];
}

export type Static = string