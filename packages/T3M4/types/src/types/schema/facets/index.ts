import * as Schema_Facet from "./facet";
import * as Schema_Mode from "./mode";

export namespace Generic {
  export type Facet = Facet.Mono | Facet.Multi;
  export namespace Facet {
    export type Mono = Schema_Facet.Mono.Generic
    export type Multi = Schema_Facet.Multi.Generic
  }

  export type Mode = Mode.Mono | Mode.Multi | Mode.System;
  export namespace Mode {
    export type Mono = Schema_Mode.Mono.Generic;
    export type Multi = Schema_Mode.Multi.Generic;
    export type System = Schema_Mode.System.Generic;
  }
}

export namespace Suggested {
  export type Facet = Facet.Mono;
  export namespace Facet {
    export type Mono = Schema_Facet.Mono.Suggested
  }

  export type Mode = Mode.Mono | Mode.System;
  export namespace Mode {
    export type Mono = Schema_Mode.Mono.Suggested;
    export type System = Schema_Mode.System.Suggested;
  }
}

export * as Facet from "./facet";
export * as Mode from "./mode";