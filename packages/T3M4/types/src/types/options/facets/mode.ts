import { MODES } from "../../constants";
import { Generic as Schema } from "../../schema/facets/mode";

export type Dynamic<Sc extends Schema> = Sc extends Schema.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Multi
    ? Dynamic.Multi<Sc>
    : Sc extends Schema.System
      ? Dynamic.System<Sc>
      : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Mono> = [Sc];
  export type Multi<Sc extends Schema.Multi> = Sc;
  export type System<Sc extends Schema.System> = [
    Sc["light"] extends string ? Sc["light"] : MODES["light"],
    Sc["dark"] extends string ? Sc["dark"] : MODES["dark"],
    ...(Sc["system"] extends string ? [Sc["system"]] : []),
    ...(Sc["custom"] extends string[] ? Sc["custom"] : []),
  ];
}
