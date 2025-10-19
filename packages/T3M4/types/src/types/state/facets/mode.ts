import { Facets } from "../../schema/island";

export type Mode<Sc extends Facets.Generic.Mode> = Sc extends Facets.Generic.Mode.Mono
  ? Mode.Mono<Sc>
  : Sc extends Facets.Generic.Mode.Multi
    ? Mode.Multi<Sc>
    : Sc extends Facets.Generic.Mode.System
      ? Mode.System<Sc>
      : never;
export namespace Mode {
  export type Mono<Sc extends Facets.Generic.Mode.Mono> = Sc;
  export type Multi<Sc extends Facets.Generic.Mode.Multi> = Sc[number];
  export type System<Sc extends Facets.Generic.Mode.System> =
    | Sc["light"]
    | Sc["dark"]
    | (Sc extends Required<Pick<Facets.Generic.Mode.System, "system">> ? Sc["system"] : never)
    | (Sc extends Required<Pick<Facets.Generic.Mode.System, "custom">> ? Sc["custom"][number] : never);
}