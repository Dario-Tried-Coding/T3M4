import { Mono, Multi, System } from "../options";

export type Generic = {
  [island: string]: Generic.Island
}
export namespace Generic {
  export type Island = Partial<{ facets: { [facet: string]: Island.Facets.Facet }; mode: Island.Facets.Mode }>;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono | Facet.Multi;
      export namespace Facet {
        export type Mono = Mono.Generic;
        export type Multi = Multi.Generic;
      }

      export type Mode = Mode.Mono | Mode.Multi | Mode.System;
      export namespace Mode {
        export type Mono = Mono.Generic;
        export type Multi = Multi.Generic;
        export type System = System.Generic;
      }
    }
  }
}

export type Suggested = {
  [island: string]: Suggested.Island;
};
export namespace Suggested {
  export type Island = Partial<{ facets: { [facet: string]: Island.Facets.Facet }; mode: Island.Facets.Mode }>;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono;
      export namespace Facet {
        export type Mono = Mono.Suggested;
      }

      export type Mode = Mode.Mono | Mode.System;
      export namespace Mode {
        export type Mono = Mono.Suggested;
        export type System = System.Suggested;
      }
    }
  }
}
