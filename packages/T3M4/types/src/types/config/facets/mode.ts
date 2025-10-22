import { COLOR_SCHEME, CONTROLLER, MODES, STRATS } from "../../constants";
import type { Generic as Schema } from "../../schema/facets/mode";

type Base = { store?: boolean; controller?: CONTROLLER | CONTROLLER[] };

export type Dynamic<Sc extends Schema> = Sc extends Schema.Mono
  ? Dynamic.Mono<Sc>
  : Sc extends Schema.Multi
    ? Dynamic.Multi<Sc>
    : Sc extends Schema.System
      ? Dynamic.System<Sc>
      : never;
export namespace Dynamic {
  export type Mono<Sc extends Schema.Mono> = Base & {
    strategy: STRATS["mono"];
    default: Sc;
    colorScheme: COLOR_SCHEME;
  };
  export type Multi<Sc extends Schema.Multi> = Base & {
    strategy: STRATS["multi"];
    default: Sc[number];
    colorSchemes: Record<Sc[number], COLOR_SCHEME>;
  };

  type Flatten<Sc extends Schema.System> =
    | Sc["light"]
    | Sc["dark"]
    | (Sc extends Required<Pick<Schema.System, "system">> ? Sc["system"] : never)
    | (Sc extends Required<Pick<Schema.System, "custom">> ? Sc["custom"][number] : never);
  type Default<Sc extends Schema.System> = {
    default: Flatten<Sc>;
  };
  type Fallback<Sc extends Schema.System> =
    Sc extends Required<Pick<Schema.System, "system">> ? { fallback: Flatten<Omit<Sc, MODES["system"]>> } : {};
  type Color_Schemes<Sc extends Schema.System> =
    Sc extends Required<Pick<Schema.System, "custom">>
      ? { colorSchemes: Record<Sc["custom"][number], COLOR_SCHEME> }
      : {};
  export type System<Sc extends Schema.System> = Base & { strategy: STRATS["system"] } & Default<Sc> &
    Fallback<Sc> &
    Color_Schemes<Sc>;
}

export type Static = never
export namespace Static {
  export type Mono = Base & { strategy: STRATS['mono'], default: string, colorScheme: COLOR_SCHEME}
  export type Multi = Base & { strategy: STRATS['multi'], default: string, colorSchemes: Record<string, COLOR_SCHEME> }
  export type System = Base & { strategy: STRATS['system'], default: string, colorSchemes?: Record<string, COLOR_SCHEME> }
}