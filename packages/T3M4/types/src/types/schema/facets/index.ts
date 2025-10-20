import * as FacetNS from "./facet";
import * as ModeNS from "./mode";

export namespace Generic {
  export type Facet = Facet.Mono | Facet.Multi;
  export namespace Facet {
    export type Mono = FacetNS.Generic.Mono
    export type Multi = FacetNS.Generic.Multi
  }

  export type Mode = Mode.Mono | Mode.Multi | Mode.System;
  export namespace Mode {
    export type Mono = ModeNS.Generic.Mono;
    export type Multi = ModeNS.Generic.Multi;
    export type System = ModeNS.Generic.System;
  }
}

export namespace Suggested {
  export type Facet = Facet.Mono;
  export namespace Facet {
    export type Mono = FacetNS.Suggested.Mono
    export type Multi = FacetNS.Suggested.Multi
  }

  export type Mode = Mode.Mono | Mode.System;
  export namespace Mode {
    export type Mono = ModeNS.Suggested.Mono;
    export type Multi = ModeNS.Suggested.Multi;
    export type System = ModeNS.Suggested.System;
  }
}

export * as Facet from "./facet";
export * as Mode from "./mode";