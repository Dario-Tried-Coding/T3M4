import { IsEmptyArray } from "../utils";
import type { Facets_Schema } from "./facets";

export namespace Island_Schema {
  export type Generic = Partial<{ facets: { [facet: string]: Generic.Facets.Facet }; mode: Generic.Facets.Mode }>;
  export namespace Generic {
    export namespace Facets {
      export type Facet = Facets_Schema.Generic.Facet;
      export namespace Facet {
        export type Mono = Facets_Schema.Generic.Facet.Mono;
        export type Multi = Facets_Schema.Generic.Facet.Multi;
      }

      export type Mode = Facets_Schema.Generic.Mode;
      export namespace Mode {
        export type Mono = Facets_Schema.Generic.Mode.Mono;
        export type Multi = Facets_Schema.Generic.Mode.Multi;
        export type System = Facets_Schema.Generic.Mode.System;
      }
    }
  }

  export type Suggested = Partial<{ facets: { [facet: string]: Suggested.Facets.Facet }; mode: Suggested.Facets.Mode }>;
  export namespace Suggested {
    export namespace Facets {
      export type Facet = Facets_Schema.Suggested.Facet;
      export namespace Facet {
        export type Mono = Facets_Schema.Suggested.Facet.Mono;
        export type Multi = Facets_Schema.Suggested.Facet.Multi;
      }

      export type Mode = Facets_Schema.Suggested.Mode;
      export namespace Mode {
        export type Mono = Facets_Schema.Suggested.Mode.Mono;
        export type Multi = Facets_Schema.Suggested.Mode.Multi;
        export type System = Facets_Schema.Suggested.Mode.System;
      }
    }
  }

  export type Readonly = Partial<{ readonly facets: { readonly [facet: string]: Readonly.Facets.Facet }; readonly mode: Readonly.Facets.Mode}>
  export namespace Readonly {
    export namespace Facets {
      export type Facet = Facets_Schema.Readonly.Facet
      export namespace Facet {
        export type Mono = Facets_Schema.Readonly.Facet.Mono
        export type Multi = Facets_Schema.Readonly.Facet.Multi
      }

      export type Mode = Facets_Schema.Readonly.Mode
      export namespace Mode {
        export type Mono = Facets_Schema.Readonly.Mode.Mono
        export type Multi = Facets_Schema.Readonly.Mode.Multi
        export type System = Facets_Schema.Readonly.Mode.System
      }
    }
  }

  type IsMeaningfulFacet<F extends Facets_Schema.Generic.Facet> = F extends Facets_Schema.Generic.Facet.Multi
    ? IsEmptyArray<F> extends true
      ? false
      : true
    : true;
  type PolishedFacets<Fs extends Required<Generic>["facets"]> = keyof Fs extends never
    ? {}
    : {
        -readonly [F in keyof Fs as IsMeaningfulFacet<Fs[F]> extends true ? F : never]: Fs[F];
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

  export namespace Facets {
    export namespace Generic {
      export type Facet = Facets_Schema.Generic.Facet;
      export namespace Facet {
        export type Mono = Facets_Schema.Generic.Facet.Mono;
        export type Multi = Facets_Schema.Generic.Facet.Multi;
      }

      export type Mode = Facets_Schema.Generic.Mode;
      export namespace Mode {
        export type Mono = Facets_Schema.Generic.Mode.Mono;
        export type Multi = Facets_Schema.Generic.Mode.Multi;
        export type System = Facets_Schema.Generic.Mode.System;
      }
    }

    export namespace Suggested {
      export type Facet = Facets_Schema.Suggested.Facet;
      export namespace Facet {
        export type Mono = Facets_Schema.Suggested.Facet.Mono;
        export type Multi = Facets_Schema.Suggested.Facet.Multi;
      }

      export type Mode = Facets_Schema.Suggested.Mode;
      export namespace Mode {
        export type Mono = Facets_Schema.Suggested.Mode.Mono;
        export type Multi = Facets_Schema.Suggested.Mode.Multi;
        export type System = Facets_Schema.Suggested.Mode.System;
      }
    }

    export namespace Readonly {
      export type Facet = Facets_Schema.Readonly.Facet
      export namespace Facet {
        export type Mono = Facets_Schema.Readonly.Facet.Mono
        export type Multi = Facets_Schema.Readonly.Facet.Multi
      }

      export type Mode = Facets_Schema.Readonly.Mode
      export namespace Mode {
        export type Mono = Facets_Schema.Readonly.Mode.Mono
        export type Multi = Facets_Schema.Readonly.Mode.Multi
        export type System = Facets_Schema.Readonly.Mode.System
      }
    }

    export namespace Facet {
      export type Generic = Facets_Schema.Facet.Generic;
      export namespace Generic {
        export type Mono = Facets_Schema.Facet.Generic.Mono;
        export type Multi = Facets_Schema.Facet.Generic.Multi;
      }

      export type Suggested = Facets_Schema.Facet.Suggested;
      export namespace Suggested {
        export type Mono = Facets_Schema.Facet.Suggested.Mono;
        export type Multi = Facets_Schema.Facet.Suggested.Multi;
      }

      export type Readonly = Facets_Schema.Facet.Readonly;
      export namespace Readonly {
        export type Mono = Facets_Schema.Facet.Readonly.Mono;
        export type Multi = Facets_Schema.Facet.Readonly.Multi;
      }
    }

    export namespace Mode {
      export type Generic = Facets_Schema.Mode.Generic;
      export namespace Generic {
        export type Mono = Facets_Schema.Mode.Generic.Mono;
        export type Multi = Facets_Schema.Mode.Generic.Multi;
        export type System = Facets_Schema.Mode.Generic.System;
      }

      export type Suggested = Facets_Schema.Mode.Suggested;
      export namespace Suggested {
        export type Mono = Facets_Schema.Mode.Suggested.Mono;
        export type Multi = Facets_Schema.Mode.Suggested.Multi;
        export type System = Facets_Schema.Mode.Suggested.System;
      }

      export type Readonly = Facets_Schema.Mode.Readonly;
      export namespace Readonly {
        export type Mono = Facets_Schema.Mode.Readonly.Mono;
        export type Multi = Facets_Schema.Mode.Readonly.Multi;
        export type System = Facets_Schema.Mode.Readonly.System;
      }
    }
  }
}
