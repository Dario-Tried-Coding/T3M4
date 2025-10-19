import { Facets } from "../../schema/island";

export type Facet<Sc extends Facets.Generic.Facet> = Sc extends Facets.Generic.Facet.Mono
  ? Facet.Mono<Sc>
  : Sc extends Facets.Generic.Facet.Multi
    ? Facet.Multi<Sc>
    : never;
export namespace Facet {
  export type Mono<Sc extends Facets.Generic.Facet.Mono> = Sc;
  export type Multi<Sc extends Facets.Generic.Facet.Multi> = Sc[number];
}