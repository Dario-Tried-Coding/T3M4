import { Generic as Schema } from "../../schema/facets/facet";

export type Dynamic<Sc extends Schema> = Sc extends Schema.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Multi
    ? Dynamic.Multi<Sc>
    : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Mono> = [Sc];
  export type Multi<Sc extends Schema.Multi> = Sc;
}
