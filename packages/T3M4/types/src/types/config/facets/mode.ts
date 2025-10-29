import { COLOR_SCHEME, CS_INDICATOR, MODES, STRATS } from "../../constants";
import type { Mode_Schema as Schema } from "../../schema/facets/mode";

type Base = { store?: boolean; controller?: CS_INDICATOR | CS_INDICATOR[] };

export namespace Mode_Config {
  export type Dynamic<Sc extends Schema.Generic> = Sc extends Schema.Generic.Mono
    ? Dynamic.Mono<Sc>
    : Sc extends Schema.Generic.Multi
      ? Dynamic.Multi<Sc>
      : Sc extends Schema.Generic.System
        ? Dynamic.System<Sc>
        : never;
  export namespace Dynamic {
    export type Mono<Sc extends Schema.Generic.Mono> = Base & {
      strategy: STRATS["mono"];
      default: Sc;
      colorScheme: COLOR_SCHEME;
    };
    export type Multi<Sc extends Schema.Generic.Multi> = Base & {
      strategy: STRATS["multi"];
      default: Sc[number];
      colorSchemes: Record<Sc[number], COLOR_SCHEME>;
    };

    type Flatten<Sc extends Schema.Generic.System> =
      | Sc["light"]
      | Sc["dark"]
      | (Sc extends Required<Pick<Schema.Generic.System, "system">> ? Sc["system"] : never)
      | (Sc extends Required<Pick<Schema.Generic.System, "custom">> ? Sc["custom"][number] : never);
    type Default<Sc extends Schema.Generic.System> = {
      default: Flatten<Sc>;
    };
    type Fallback<Sc extends Schema.Generic.System> =
      Sc extends Required<Pick<Schema.Generic.System, "system">>
        ? { fallback: Flatten<Omit<Sc, MODES["system"]>> }
        : {};
    type Color_Schemes<Sc extends Schema.Generic.System> =
      Sc extends Required<Pick<Schema.Generic.System, "custom">>
        ? { colorSchemes: Record<Sc["custom"][number], COLOR_SCHEME> }
        : {};
    export type System<Sc extends Schema.Generic.System> = Base & { strategy: STRATS["system"] } & Default<Sc> &
      Fallback<Sc> &
      Color_Schemes<Sc>;
  }

  export type Static = Static.Mono | Static.Multi | Static.System;
  export namespace Static {
    export type Mono = Base & { strategy: STRATS["mono"]; default: string; colorScheme: COLOR_SCHEME };
    export type Multi = Base & {
      strategy: STRATS["multi"];
      default: string;
      colorSchemes: Record<string, COLOR_SCHEME>;
    };
    export type System = Base & {
      strategy: STRATS["system"];
      default: string;
      colorSchemes?: Record<string, COLOR_SCHEME>;
    };
  }
}
