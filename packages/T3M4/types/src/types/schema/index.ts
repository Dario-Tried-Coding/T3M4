import { IsEmptyArray } from "../utils";
import * as IslandNS from "./island";

export type Generic = {
  [island: string]: IslandNS.Generic;
};
export namespace Generic {
  export type Island = IslandNS.Generic;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono | Facet.Multi;
      export namespace Facet {
        export type Mono = IslandNS.Generic.Facets.Facet.Mono;
        export type Multi = IslandNS.Generic.Facets.Facet.Multi;
      }

      export type Mode = Mode.Mono | Mode.Multi | Mode.System;
      export namespace Mode {
        export type Mono = IslandNS.Generic.Facets.Mode.Mono;
        export type Multi = IslandNS.Generic.Facets.Mode.Multi;
        export type System = IslandNS.Generic.Facets.Mode.System;
      }
    }
  }
}

export type Suggested = {
  [island: string]: Suggested.Island;
};
export namespace Suggested {
  export type Island = IslandNS.Suggested;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono | Facet.Multi;
      export namespace Facet {
        export type Mono = IslandNS.Suggested.Facets.Facet.Mono;
        export type Multi = IslandNS.Suggested.Facets.Facet.Multi;
      }

      export type Mode = Mode.Mono | Mode.Multi | Mode.System;
      export namespace Mode {
        export type Mono = IslandNS.Suggested.Facets.Mode.Mono;
        export type Multi = IslandNS.Suggested.Facets.Mode.Multi;
        export type System = IslandNS.Suggested.Facets.Mode.System;
      }
    }
  }
}

type IsMeaningfulFacet<F extends Generic.Island.Facets.Facet> = F extends Generic.Island.Facets.Facet.Multi
  ? IsEmptyArray<F> extends true
    ? false
    : true
  : true;
type PolishedFacets<Fs extends Required<Generic.Island>["facets"]> = keyof Fs extends never
  ? {}
  : {
      [F in keyof Fs as IsMeaningfulFacet<Fs[F]> extends true ? F : never]: Fs[F];
    };
type IsMeaningfulIsland<I extends IslandNS.Generic> = keyof I extends never
  ? false
  : I extends Required<Pick<IslandNS.Generic, "mode">>
    ? I["mode"] extends IslandNS.Generic.Facets.Mode.Multi
      ? IsEmptyArray<I["mode"]> extends true
        ? false
        : true
      : true
    : I extends Required<Pick<IslandNS.Generic, "facets">>
      ? keyof I["facets"] extends never
        ? false
        : keyof PolishedFacets<I["facets"]> extends never ? false : true
      : false;

export type Polished<Sc extends Generic> = {
  [I in keyof Sc as IsMeaningfulIsland<Sc[I]> extends true ? I : never]: Sc[I];
};

const test = {
  island: {
    facets: {
      facet: [],
    },
  },
} as const satisfies Generic;
type Test = Polished<typeof test>;
type Test1 = IsMeaningfulIsland<(typeof test)["island"]>;

export * as Island from "./island";
