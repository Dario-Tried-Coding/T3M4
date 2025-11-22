import { CONSTANTS } from "..";

export namespace Facets {
  export type AsObj = Record<string, { mode?: boolean; facets?: string[] }>;
}

export namespace Strategies {
  export type AsObj = {
    [island: string]: {
      mode: CONSTANTS.STRAT | undefined;
      facets: {
        [facet: string]: CONSTANTS.STRAT | undefined;
      };
    };
  };
}

export namespace Islands {
  export type AsArr = string[];
}