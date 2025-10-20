import { IsEmptyArray } from "../utils";
import * as FacetsNS from "./facets";

export type Generic = Partial<{ facets: { [facet: string]: Generic.Facets.Facet }; mode: Generic.Facets.Mode }>;
export namespace Generic {
  export namespace Facets {
    export type Facet = Facet.Mono | Facet.Multi;
    export namespace Facet {
      export type Mono = FacetsNS.Generic.Facet.Mono;
      export type Multi = FacetsNS.Generic.Facet.Multi;
    }

    export type Mode = Mode.Mono | Mode.Multi | Mode.System;
    export namespace Mode {
      export type Mono = FacetsNS.Generic.Mode.Mono;
      export type Multi = FacetsNS.Generic.Mode.Multi;
      export type System = FacetsNS.Generic.Mode.System;
    }
  }
}

export type Suggested = Partial<{ facets: { [facet: string]: Suggested.Facets.Facet }; mode: Suggested.Facets.Mode }>;
export namespace Suggested {
  export namespace Facets {
    export type Facet = Facet.Mono | Facet.Multi;
    export namespace Facet {
      export type Mono = FacetsNS.Suggested.Facet.Mono;
      export type Multi = FacetsNS.Suggested.Facet.Multi;
    }

    export type Mode = Mode.Mono | Mode.Multi | Mode.System;
    export namespace Mode {
      export type Mono = FacetsNS.Suggested.Mode.Mono;
      export type Multi = FacetsNS.Suggested.Mode.Multi;
      export type System = FacetsNS.Suggested.Mode.System;
    }
  }
}

type IsMeaningfulFacet<F extends Generic.Facets.Facet> = F extends Generic.Facets.Facet.Multi
  ? IsEmptyArray<F> extends true
    ? false
    : true
  : true;
type PolishedFacets<Fs extends Required<Generic>["facets"]> = keyof Fs extends never
  ? {}
  : {
      [F in keyof Fs as IsMeaningfulFacet<Fs[F]> extends true ? F : never]: Fs[F];
    };
type IsMeaningfulMode<M extends Generic.Facets.Mode> = M extends Generic.Facets.Mode.Multi
  ? IsEmptyArray<M> extends true
    ? false
    : true
  : true;
export type Polished<Sc extends Generic> = (Sc extends Required<Pick<Generic, "facets">>
  ? keyof PolishedFacets<Sc["facets"]> extends never
    ? {}
    : { facets: PolishedFacets<Sc["facets"]> }
  : {}) &
  (Sc extends Required<Pick<Generic, "mode">>
    ? IsMeaningfulMode<Sc["mode"]> extends true
      ? { mode: Sc["mode"] }
      : {}
    : {});

export * as Facets from "./facets";
