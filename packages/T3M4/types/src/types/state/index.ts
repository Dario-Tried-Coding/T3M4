import * as Schema from "../schema";
import { Island as IslandNS } from "./island";

export type State<Sc extends Schema.Generic> = {
  [I in keyof Schema.Polished<Sc>]: IslandNS<Sc[I]>;
};

export namespace State {
  export type Island<Sc extends Schema.Generic.Island> = IslandNS<Sc>;
  export namespace Island {
    export namespace Facets {
      export type Facet<Sc extends Schema.Generic.Island.Facets.Facet> = IslandNS.Facets.Facet<Sc>;
      export namespace Facet {
        export type Mono<Sc extends Schema.Generic.Island.Facets.Facet.Mono> = IslandNS.Facets.Facet.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Island.Facets.Facet.Multi> = IslandNS.Facets.Facet.Multi<Sc>;
      }

      export type Mode<Sc extends Schema.Generic.Island.Facets.Mode> = IslandNS.Facets.Mode<Sc>;
      export namespace Mode {
        export type Mono<Sc extends Schema.Generic.Island.Facets.Mode.Mono> = IslandNS.Facets.Mode.Mono<Sc>;
        export type Multi<Sc extends Schema.Generic.Island.Facets.Mode.Multi> = IslandNS.Facets.Mode.Multi<Sc>;
        export type System<Sc extends Schema.Generic.Island.Facets.Mode.System> = IslandNS.Facets.Mode.System<Sc>;
      }
    }
  }
}

const test = {
  island0: { facets: {}, mode: []},
  island1: {},
  island2: { facets: {} },
  island3: { mode: 'default' },
  island4: { mode: [] },
  island5: { mode: ['lighttt', 'darkkk'] },
  island5_1: { mode: { light: 'lightttt', dark: 'darkkkk'}},
  island5_2: { mode: { light: 'lightttt', dark: 'darkkkk', system: 'systemmmm'}},
  island5_3: { mode: { light: 'lightttt', dark: 'darkkkk', system: 'systemmmm', custom: []}},
  island5_4: { mode: { light: 'lightttt', dark: 'darkkkk', system: 'systemmmm', custom: ['custom1', 'custom2']}},
  island5_5: { mode: { light: 'lightttt', dark: 'darkkkk', custom: ['custom1', 'custom2']}},
  island5_6: { mode: { light: 'lightttt', dark: 'darkkkk', custom: []}},
  island6: { facets: {}, mode: 'defaultttt' },
  island7: { facets: {}, mode: ['defaultttt', 'lighttt', 'darkkk'] },
  island8: { facets: { facet1: 'defaultttt' } },
  island9: { facets: { facet1: [] } },
  island9_1: { facets: { facet1: [] }, mode: [] },
  island10: { facets: { facet1: ['custom1', 'custom2'] } },
  island11: { facets: { facet1: ['custom1', 'custom2'] }, mode: 'defaultttt' },
} as const satisfies Schema.Suggested
type test = State<typeof test>