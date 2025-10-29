import { Config } from "../config";
import { IsEmptyArray } from "../utils";
import type { Island_Schema } from "./island";

export namespace Schema {
  export type Generic = {
    [island: string]: Generic.Island;
  };
  export namespace Generic {
    export type Island = Island_Schema.Generic;
    export namespace Island {
      export namespace Facets {
        export type Facet = Island_Schema.Generic.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Generic.Facets.Facet.Mono;
          export type Multi = Island_Schema.Generic.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Generic.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Generic.Facets.Mode.Mono;
          export type Multi = Island_Schema.Generic.Facets.Mode.Multi;
          export type System = Island_Schema.Generic.Facets.Mode.System;
        }
      }
    }
  }

  export type Suggested = {
    [island: string]: Suggested.Island;
  };
  export namespace Suggested {
    export type Island = Island_Schema.Suggested;
    export namespace Island {
      export namespace Facets {
        export type Facet = Island_Schema.Suggested.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Suggested.Facets.Facet.Mono;
          export type Multi = Island_Schema.Suggested.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Suggested.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Suggested.Facets.Mode.Mono;
          export type Multi = Island_Schema.Suggested.Facets.Mode.Multi;
          export type System = Island_Schema.Suggested.Facets.Mode.System;
        }
      }
    }
  }

  export type Readonly = {
    readonly [island: string]: Readonly.Island;
  };
  export namespace Readonly {
    export type Island = Island_Schema.Readonly;
    export namespace Island {
      export namespace Facets {
        export type Facet = Island_Schema.Readonly.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Readonly.Facets.Facet.Mono;
          export type Multi = Island_Schema.Readonly.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Readonly.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Readonly.Facets.Mode.Mono;
          export type Multi = Island_Schema.Readonly.Facets.Mode.Multi;
          export type System = Island_Schema.Readonly.Facets.Mode.System;
        }
      }
    }
  }

  type IsMeaningfulFacet<F extends Readonly.Island.Facets.Facet> = F extends Readonly.Island.Facets.Facet.Multi
    ? IsEmptyArray<F> extends true
      ? false
      : true
    : true;
  type PolishedFacets<Fs extends Required<Generic.Island>["facets"]> = keyof Fs extends never
    ? {}
    : {
        [F in keyof Fs as IsMeaningfulFacet<Fs[F]> extends true ? F : never]: Fs[F];
      };
  type IsMeaningfulIsland<I extends Island_Schema.Generic> = keyof I extends never
    ? false
    : I extends Required<Pick<Island_Schema.Generic, "mode">>
      ? I["mode"] extends Island_Schema.Generic.Facets.Mode.Multi
        ? IsEmptyArray<I["mode"]> extends true
          ? false
          : true
        : true
      : I extends Required<Pick<Island_Schema.Generic, "facets">>
        ? keyof I["facets"] extends never
          ? false
          : keyof PolishedFacets<I["facets"]> extends never
            ? false
            : true
        : false;

  export type Polished<Sc extends Generic> = {
    [I in keyof Sc as IsMeaningfulIsland<Sc[I]> extends true ? I : never]: Polished.Island<Sc[I]>;
  };
  export namespace Polished {
    export type Island<Sc extends Island_Schema.Generic> = Island_Schema.Polished<Sc>
  }

  export namespace Island {
    export type Generic = Island_Schema.Generic;
    export namespace Generic {
      export namespace Facets {
        export type Facet = Island_Schema.Generic.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Generic.Facets.Facet.Mono;
          export type Multi = Island_Schema.Generic.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Generic.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Generic.Facets.Mode.Mono;
          export type Multi = Island_Schema.Generic.Facets.Mode.Multi;
          export type System = Island_Schema.Generic.Facets.Mode.System;
        }
      }
    }

    export type Suggested = Island_Schema.Suggested;
    export namespace Suggested {
      export namespace Facets {
        export type Facet = Island_Schema.Suggested.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Suggested.Facets.Facet.Mono;
          export type Multi = Island_Schema.Suggested.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Suggested.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Suggested.Facets.Mode.Mono;
          export type Multi = Island_Schema.Suggested.Facets.Mode.Multi;
          export type System = Island_Schema.Suggested.Facets.Mode.System;
        }
      }
    }

    export type Readonly = Island_Schema.Readonly;
    export namespace Readonly {
      export namespace Facets {
        export type Facet = Island_Schema.Readonly.Facets.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Readonly.Facets.Facet.Mono;
          export type Multi = Island_Schema.Readonly.Facets.Facet.Multi;
        }

        export type Mode = Island_Schema.Readonly.Facets.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Readonly.Facets.Mode.Mono;
          export type Multi = Island_Schema.Readonly.Facets.Mode.Multi;
          export type System = Island_Schema.Readonly.Facets.Mode.System;
        }
      }
    }

    export namespace Facets {
      export namespace Generic {
        export type Facet = Island_Schema.Facets.Generic.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Facets.Generic.Facet.Mono;
          export type Multi = Island_Schema.Facets.Generic.Facet.Multi;
        }

        export type Mode = Island_Schema.Facets.Generic.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Facets.Generic.Mode.Mono;
          export type Multi = Island_Schema.Facets.Generic.Mode.Multi;
          export type System = Island_Schema.Facets.Generic.Mode.System;
        }
      }

      export namespace Suggested {
        export type Facet = Island_Schema.Facets.Suggested.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Facets.Suggested.Facet.Mono;
          export type Multi = Island_Schema.Facets.Suggested.Facet.Multi;
        }

        export type Mode = Island_Schema.Facets.Suggested.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Facets.Suggested.Mode.Mono;
          export type Multi = Island_Schema.Facets.Suggested.Mode.Multi;
          export type System = Island_Schema.Facets.Suggested.Mode.System;
        }
      }

      export namespace Readonly {
        export type Facet = Island_Schema.Facets.Readonly.Facet;
        export namespace Facet {
          export type Mono = Island_Schema.Facets.Readonly.Facet.Mono;
          export type Multi = Island_Schema.Facets.Readonly.Facet.Multi;
        }

        export type Mode = Island_Schema.Facets.Readonly.Mode;
        export namespace Mode {
          export type Mono = Island_Schema.Facets.Readonly.Mode.Mono;
          export type Multi = Island_Schema.Facets.Readonly.Mode.Multi;
          export type System = Island_Schema.Facets.Readonly.Mode.System;
        }
      }

      export namespace Facet {
        export type Generic = Island_Schema.Facets.Facet.Generic;
        export namespace Generic {
          export type Mono = Island_Schema.Facets.Facet.Generic.Mono;
          export type Multi = Island_Schema.Facets.Facet.Generic.Multi;
        }

        export type Suggested = Island_Schema.Facets.Facet.Suggested;
        export namespace Suggested {
          export type Mono = Island_Schema.Facets.Facet.Suggested.Mono;
          export type Multi = Island_Schema.Facets.Facet.Suggested.Multi;
        }

        export type Readonly = Island_Schema.Facets.Facet.Readonly;
        export namespace Readonly {
          export type Mono = Island_Schema.Facets.Facet.Readonly.Mono;
          export type Multi = Island_Schema.Facets.Facet.Readonly.Multi;
        }
      }

      export namespace Mode {
        export type Generic = Island_Schema.Facets.Mode.Generic;
        export namespace Generic {
          export type Mono = Island_Schema.Facets.Mode.Generic.Mono;
          export type Multi = Island_Schema.Facets.Mode.Generic.Multi;
          export type System = Island_Schema.Facets.Mode.Generic.System;
        }

        export type Suggested = Island_Schema.Facets.Mode.Suggested;
        export namespace Suggested {
          export type Mono = Island_Schema.Facets.Mode.Suggested.Mono;
          export type Multi = Island_Schema.Facets.Mode.Suggested.Multi;
          export type System = Island_Schema.Facets.Mode.Suggested.System;
        }

        export type Readonly = Island_Schema.Facets.Mode.Readonly;
        export namespace Readonly {
          export type Mono = Island_Schema.Facets.Mode.Readonly.Mono;
          export type Multi = Island_Schema.Facets.Mode.Readonly.Multi;
          export type System = Island_Schema.Facets.Mode.Readonly.System;
        }
      }
    }
  }
}

const testSchema = {
  root: {
    mode: "default",
    facets: {
      facet1: [],
    },
  },
} as const satisfies Schema.Suggested;
type testPolished = Schema.Polished<typeof testSchema>;
type testConfig = Config.Dynamic<typeof testSchema>;
