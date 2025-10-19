import * as Schema_Island from "./island";

export type Generic = {
  [island: string]: Generic.Island;
};
export namespace Generic {
  export type Island = Schema_Island.Generic;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono | Facet.Multi;
      export namespace Facet {
        export type Mono = Schema_Island.Generic.Facets.Facet.Mono;
        export type Multi = Schema_Island.Generic.Facets.Facet.Multi;
      }

      export type Mode = Mode.Mono | Mode.Multi | Mode.System;
      export namespace Mode {
        export type Mono = Schema_Island.Generic.Facets.Mode.Mono;
        export type Multi = Schema_Island.Generic.Facets.Mode.Multi;
        export type System = Schema_Island.Generic.Facets.Mode.System;
      }
    }
  }
}

export type Suggested = {
  [island: string]: Suggested.Island;
};
export namespace Suggested {
  export type Island = Schema_Island.Suggested;
  export namespace Island {
    export namespace Facets {
      export type Facet = Facet.Mono;
      export namespace Facet {
        export type Mono = Schema_Island.Suggested.Facets.Facet.Mono;
      }

      export type Mode = Mode.Mono | Mode.System;
      export namespace Mode {
        export type Mono = Schema_Island.Suggested.Facets.Mode.Mono;
        export type System = Schema_Island.Suggested.Facets.Mode.System;
      }
    }
  }
}

export * as Island from "./island";
