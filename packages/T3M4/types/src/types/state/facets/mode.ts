import { Facets_Schema as Schema } from "../../schema/facets";

export namespace Mode_State {
  export type Dynamic<Sc extends Schema.Generic.Mode> = Sc extends Schema.Generic.Mode.Mono
    ? Dynamic.Mono<Sc>
    : Sc extends Schema.Generic.Mode.Multi
      ? Dynamic.Multi<Sc>
      : Sc extends Schema.Generic.Mode.System
        ? Dynamic.System<Sc>
        : never;
  export namespace Dynamic {
    export type Mono<Sc extends Schema.Generic.Mode.Mono> = Sc;
    export type Multi<Sc extends Schema.Generic.Mode.Multi> = Sc[number];
    export type System<Sc extends Schema.Generic.Mode.System> =
      | Sc["light"]
      | Sc["dark"]
      | (Sc extends Required<Pick<Schema.Generic.Mode.System, "system">> ? Sc["system"] : never)
      | (Sc extends Required<Pick<Schema.Generic.Mode.System, "custom">> ? Sc["custom"][number] : never);
  }

  export type Static = string;
}
