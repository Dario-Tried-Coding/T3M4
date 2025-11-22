import { Facets, Islands, Options, State, Strategies } from "@t3m4/types";

export type Args_Gen = {
  islands: Islands.AsArr;
  strategies: Strategies.AsObj;
  facets: Facets.AsObj;
  options: Options.AsObj;
  defaultState: State.Static;
};

export type Args = Args_Gen & {
  
}