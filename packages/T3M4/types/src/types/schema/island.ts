import * as Schema_Facets from "./facets/facets";

export type Generic = Partial<{ facets: { [facet: string]: Generic.Facets.Facet }; mode: Generic.Facets.Mode }>;
export namespace Generic {
  export namespace Facets {
    export type Facet = Facet.Mono | Facet.Multi;
    export namespace Facet {
      export type Mono = Schema_Facets.Facet.Generic.;
      export type Multi = Schema_Facets.Facet.Generic;
    }

    export type Mode = Mode.Mono | Mode.Multi | Mode.System;
    export namespace Mode {
      export type Mono = Schema_Mode.Generic;
      export type Multi = Schema_Mode.Generic;
      export type System = Schema_Mode.Generic;
    }
  }
}

export type Suggested = Partial<{ facets: { [facet: string]: Suggested.Facets.Facet }; mode: Suggested.Facets.Mode }>;
export namespace Suggested {
  export namespace Facets {
    export type Facet = Facet.Mono;
    export namespace Facet {
      export type Mono = Schema_Facet.Generic;
    }

    export type Mode = Mode.Mono | Mode.System;
    export namespace Mode {
      export type Mono = Schema_Mode.Generic;
      export type System = Schema_Mode.Generic;
    }
  }
}

export * as Facet from "./facets/facet";
export * as Mode from "./facets/mode";
