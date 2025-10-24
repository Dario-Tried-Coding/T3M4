import { Generic as Schema } from "../../schema/facets";

export type Dynamic<Sc extends Schema.Mode> = Sc extends Schema.Mode.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Mode.Multi
    ? Dynamic.Multi<Sc>
    : Sc extends Schema.Mode.System
      ? Dynamic.System<Sc>
      : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Mode.Mono> = Sc;
  export type Multi<Sc extends Schema.Mode.Multi> = Sc[number];
  export type System<Sc extends Schema.Mode.System> =
    | Sc["light"]
    | Sc["dark"]
    | (Sc extends Required<Pick<Schema.Mode.System, "system">> ? Sc["system"] : never)
    | (Sc extends Required<Pick<Schema.Mode.System, "custom">> ? Sc["custom"][number] : never);
}

export type Static = string