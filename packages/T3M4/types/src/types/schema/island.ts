import * as Schema_Facets from "./facets";

export type Generic = Partial<{ facets: { [facet: string]: Generic.Facets.Facet }; mode: Generic.Facets.Mode }>;
export namespace Generic {
  export namespace Facets {
    export type Facet = Facet.Mono | Facet.Multi;
    export namespace Facet {
      export type Mono = Schema_Facets.Generic.Facet.Mono;
      export type Multi = Schema_Facets.Generic.Facet.Multi;
    }

    export type Mode = Mode.Mono | Mode.Multi | Mode.System;
    export namespace Mode {
      export type Mono = Schema_Facets.Generic.Mode.Mono;
      export type Multi = Schema_Facets.Generic.Mode.Multi;
      export type System = Schema_Facets.Generic.Mode.System;
    }
  }
}

export type Suggested = Partial<{ facets: { [facet: string]: Suggested.Facets.Facet }; mode: Suggested.Facets.Mode }>;
export namespace Suggested {
  export namespace Facets {
    export type Facet = Facet.Mono;
    export namespace Facet {
      export type Mono = Schema_Facets.Suggested.Facet.Mono;
    }

    export type Mode = Mode.Mono | Mode.System;
    export namespace Mode {
      export type Mono = Schema_Facets.Suggested.Mode.Mono;
      export type System = Schema_Facets.Suggested.Mode.System;
    }
  }
}

export * as Facets from "./facets"
