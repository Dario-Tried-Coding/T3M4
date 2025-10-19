import * as Schema_Facet from "./facet";
import * as Schema_Mode from "./mode";

export namespace Generic {
  export type Facet = Facet.Mono | Facet.Multi;
  export namespace Facet {
    export type Mono = Schema_Facet.Generic.Mono
    export type Multi = Schema_Facet.Generic.Multi
  }

  export type Mode = Mode.Mono | Mode.Multi | Mode.System;
  export namespace Mode {
    export type Mono = Schema_Mode.Generic.Mono;
    export type Multi = Schema_Mode.Generic.Multi;
    export type System = Schema_Mode.Generic.System;
  }
}

export namespace Suggested {
  export type Facet = Facet.Mono;
  export namespace Facet {
    export type Mono = Schema_Facet.Suggested.Mono
  }

  export type Mode = Mode.Mono | Mode.System;
  export namespace Mode {
    export type Mono = Schema_Mode.Suggested.Mono;
    export type System = Schema_Mode.Suggested.System;
  }
}

export * as Facet from "./facet";
export * as Mode from "./mode";